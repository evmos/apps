// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { isUndefined, raise } from "helpers";
import {
  EIP1193EventMap,
  EIP1193Provider,
  EIP1474Methods,
  createPublicClient,
  hexToSignature,
  http,
  toHex,
} from "viem";
import { ChainInfo, EthSignType } from "@keplr-wallet/types";
import { fromHex, isHex, parseAccount, serializeTransaction } from "viem/utils";
import { get, omit, uniqueId } from "lodash-es";
import { estimateFeesPerGas, estimateGas } from "viem/actions";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { EventEmitter } from "events";
import { EVMOS_CONFIG_MAP } from "helpers/src/evmos-info";
import { OfflineSigner } from "@cosmjs/proto-signing";

type ByMethod<M extends string> = Extract<
  EIP1474Methods[number],
  { Method: M }
>;
type EIP1474ReturnType<M extends string> = ByMethod<M>["ReturnType"];
type EIP1474Parameters<M extends string> = ByMethod<M>["Parameters"];

type ChainConfig =
  | ChainInfo
  | {
    // this means the chain doesn't need to be suggested to keplr
    isNative: true;
    chainId: string;
  };

// This is the interface we expect from cosmos based wallets
// chain info could be different from wallet to wallet, ideally we'd like
// to make it type safe, but I think it's not worth the trouble for now while we only support keplr and leap, we may want to revisit later,
// so I just threw any in there, sorry not sorry
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PublicCosmosProvider<TChainInfo = any> {
  enable: (chainId: string) => Promise<void>;
  experimentalSuggestChain: (chainInfo: TChainInfo) => Promise<void>;
  signEthereum: (
    chainId: string,
    signer: string,
    data: string | Uint8Array,
    type: EthSignType,
  ) => Promise<Uint8Array>;
  getOfflineSigner: (chainId: string) => OfflineSigner;
}

/**
 * This is a wrapper around cosmos based public providers.
 * Generally, they only provide a "signEthereum" method, but do not implement the EIP1193Provider interface as EVM based wallets do.
 * So this is a bridge to make them compatible with EIP1193Provider.
 */
export class CosmosEIP1193Provider implements EIP1193Provider {
  private ee = new EventEmitter({});
  private connectedNetwork: number;

  private getCosmosProvider: () => Promise<PublicCosmosProvider>;
  constructor(
    public name: string,
    public chainConfigMap: {
      DEFAULT: number;
      [evmId: number]: ChainConfig | (() => Promise<ChainConfig>);
    },

    getCosmosProvider: () => Promise<PublicCosmosProvider>,
  ) {
    this.getCosmosProvider = getCosmosProvider.bind(this);
    this.connectedNetwork = this.chainConfigMap.DEFAULT;
    if (typeof window === "undefined") return;
    void this.setup();
  }

  private resolveCosmosConfig = async (evmChainId: string | number) => {
    const chainConfig = this.chainConfigMap[Number(evmChainId)];
    if (!chainConfig) {
      throw new Error("Chain not supported");
    }
    return typeof chainConfig === "function"
      ? await chainConfig()
      : chainConfig;
  };

  private getCosmosId = async () => {
    const chainConfig = await this.resolveCosmosConfig(this.connectedNetwork);
    return chainConfig.chainId;
  };

  private setIsAuthorized = (isAuthorized: boolean) => {
    window.localStorage.setItem(
      `${this.name}.ProviderStatus`,
      isAuthorized ? "authorized" : "unauthorized",
    );
  };
  private getIsAuthorized = () => {
    return (
      window.localStorage.getItem(`${this.name}.ProviderStatus`) ===
      "authorized"
    );
  };

  on<TEvent extends keyof EIP1193EventMap>(
    event: TEvent,
    listener: EIP1193EventMap[TEvent],
  ): void {
    this.ee.addListener(event, listener);
  }
  removeListener<TEvent extends keyof EIP1193EventMap>(
    event: TEvent,
    listener: EIP1193EventMap[TEvent],
  ): void {
    this.ee.removeListener(event, listener);
  }
  request: EIP1193Provider["request"] = async (args) => {
    console.log(args);
    // proxies all requests to methods declared internally

    const fn: unknown = get(this, args.method);
    if (typeof fn !== "function") {
      // redirect to the public provider
      const client = await this.getPublicClient();
      return client.request(args as never);
    }

    return fn(args.params) as never;
  };

  private eth_chainId = () => {
    return Promise.resolve(toHex(this.connectedNetwork));
  };

  private eth_requestAccounts = async () => {
    const provider = await this.getCosmosProvider();

    const signer = provider.getOfflineSigner(await this.getCosmosId());

    const [account = raise("Account not found")] = await signer.getAccounts();

    this.setIsAuthorized(true);
    return [normalizeToEth(account.address)] as const;
  };

  private personal_sign = async (
    parameters: [string],
  ): Promise<EIP1474ReturnType<"personal_sign">> => {

    return this.signEvm(parameters, EthSignType.MESSAGE);
  };

  private signEvm = async (parameters: [string], signType: EthSignType) => {
    const cosmosId = await this.getCosmosId();

    const [account] = await this.eth_requestAccounts();
    const cosmosProvider = await this.getCosmosProvider();
    const signature = await cosmosProvider.signEthereum(
      cosmosId,
      normalizeToCosmos(account),
      parameters[0],
      signType,
    );

    return toHex(signature);
  };
  private getPublicClient = async () => {
    const chainId = Number(
      await this.request({ method: "eth_chainId" }),
    );
    const chain =
      Object.values(EVMOS_CONFIG_MAP).find((chain) => chain.id === chainId) ??
      raise("Chain not found");
    return createPublicClient({
      chain,
      transport: http(),
    });
  };
  private prepareTransactionForProvider = async (
    request: EIP1474Parameters<"eth_sendTransaction">[0],
  ) => {
    const chainId = Number(
      await this.request({ method: "eth_chainId" }),
    );

    const client = await this.getPublicClient();
    const account = parseAccount(request.from);

    const nonce =
      request.nonce ??
      (await client.getTransactionCount({
        address: account.address,
        blockTag: "pending",
      }));

    const transaction = {
      from: request.from,
      data: request.data,
      to: request.to ?? undefined,
      value: request.value,
      nonce: isHex(nonce) ? fromHex(nonce, "number") : nonce,
      chainId,
    };

    let maxFeePerGas = isHex(request.maxFeePerGas)
      ? fromHex(request.maxFeePerGas, "bigint")
      : undefined;
    let maxPriorityFeePerGas = isHex(request.maxPriorityFeePerGas)
      ? fromHex(request.maxPriorityFeePerGas, "bigint")
      : undefined;
    if (isUndefined(maxFeePerGas) || isUndefined(maxPriorityFeePerGas)) {
      const estimate = await estimateFeesPerGas(client);
      maxFeePerGas = estimate.maxFeePerGas;
      maxPriorityFeePerGas = estimate.maxPriorityFeePerGas;
    }

    const eip1559Request = omit(request, "gasPrice");
    const gas =
      request.gas ??
      (await estimateGas(client, {
        type: "eip1559",
        account: { address: account.address, type: "json-rpc" },
        data: request.data,
        to: request.to,
        value: isHex(request.value)
          ? fromHex(request.value, "bigint")
          : undefined,

        nonce: isHex(request.nonce)
          ? fromHex(request.nonce, "number")
          : undefined,

        accessList: request.accessList,
        maxFeePerGas,
        maxPriorityFeePerGas,
        gas: isHex(eip1559Request.gas)
          ? fromHex(eip1559Request.gas, "bigint")
          : undefined,
      }));

    return {
      ...transaction,
      type: 2,
      gasLimit: isHex(gas) ? gas : toHex(gas),
      maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
      maxFeePerGas: toHex(maxFeePerGas),
    };
  };
  private eth_sendTransaction = async ([
    request,
  ]: EIP1474Parameters<"eth_sendTransaction">): Promise<
    EIP1474ReturnType<"eth_sendTransaction">
  > => {
    const transaction = await this.prepareTransactionForProvider(request);
    const signature = await this.signEvm(
      [JSON.stringify(transaction)],
      EthSignType.TRANSACTION,
    );

    const message = serializeTransaction(
      {
        value: isHex(transaction.value)
          ? fromHex(transaction.value, "bigint")
          : undefined,
        nonce: transaction.nonce,
        to: transaction.to,

        chainId: transaction.chainId,
        data: transaction.data,
        type: "eip1559",

        gas: fromHex(transaction.gasLimit, "bigint"),

        maxFeePerGas: fromHex(transaction.maxFeePerGas, "bigint"),
        maxPriorityFeePerGas: fromHex(
          transaction.maxPriorityFeePerGas,
          "bigint",
        ),
      },
      hexToSignature(signature),
    );
    const client = await this.getPublicClient();

    return client.request({
      method: "eth_sendRawTransaction",
      params: [message],
    });
  };
  private eth_signTypedData_v4 = async (
    parameters: EIP1474Parameters<"eth_signTypedData_v4">,
  ): Promise<EIP1474ReturnType<"eth_signTypedData_v4">> => {
    const cosmosProvider = await this.getCosmosProvider();
    const cosmosId = await this.getCosmosId();
    const [account, message] = parameters;
    const signature = await cosmosProvider.signEthereum(
      cosmosId,
      normalizeToCosmos(account),
      message,
      EthSignType.EIP712,
    );

    return toHex(signature);
  };

  private wallet_requestPermissions = async (
    request: EIP1474Parameters<"wallet_requestPermissions">,
  ): Promise<EIP1474ReturnType<"wallet_requestPermissions">> => {
    const response = await Promise.all(
      request.map(async ({ }) => ({
        id: uniqueId(this.name),
        parentCapability: "eth_accounts",

        invoker: "https://" as const,

        caveats: [
          {
            type: "restrictReturnedAccounts",
            value: await this.eth_requestAccounts(),
          },
        ],
        date: Date.now(),
      })),
    );

    this.setIsAuthorized(true);
    return response;
  };

  private eth_accounts = async () => {
    if (this.getIsAuthorized()) {
      return this.eth_requestAccounts();
    }
    return [];
  };

  private setChain(chainId: number | string) {
    const normalized = Number(chainId);

    if (this.connectedNetwork === normalized) return;
    this.ee.emit("chainChanged", toHex(normalized));
    this.connectedNetwork = normalized;
  }
  private wallet_addEthereumChain = async (
    request: EIP1474Parameters<"wallet_addEthereumChain">,
  ): Promise<EIP1474ReturnType<"wallet_addEthereumChain">> => {
    const chainId = request[0].chainId;
    const cosmosProvider = await this.getCosmosProvider();

    const chainConfig = await this.resolveCosmosConfig(chainId);
    if (!("isNative" in chainConfig)) {
      await cosmosProvider.experimentalSuggestChain(chainConfig);
    }
    await cosmosProvider.enable(chainConfig.chainId);
    this.setChain(chainId);

    return null;
  };

  private wallet_switchEthereumChain = this.wallet_addEthereumChain;

  private setup() {
    if (typeof window === "undefined") return;

    window.addEventListener(`${this.name}_keystorechange`, async () => {
      const accounts = await this.eth_requestAccounts();

      this.ee.emit("accountsChanged", accounts);
    });
  }
}
