import {
  EthSignType,
  Keplr,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
import { getPublicClient } from "wagmi/actions";
import { Chain, Connector } from "wagmi";

import { getKeplrProvider } from "../utils/keplr";

import { getEvmosChainInfo } from "./chains";
import { assertIf, raise } from "helpers";

import { serialize, UnsignedTransaction } from "@ethersproject/transactions";
import { ethToEvmos, evmosToEth } from "@evmos/address-converter";
import {
  Address,
  Hex,
  TransactionRequest,
  createWalletClient,
  custom,
  http,
  toHex,
} from "viem";

import { isHex, parseAccount } from "viem/utils";
import { isString } from "helpers/src/assertions";
import { z } from "zod";

const evmosInfo = getEvmosChainInfo();

// Right now this only supports evmos, but it'd be nice to figure out how to support
// other chains as well.
// const COSMOS_ID_MAP = {
//   [evmos.id]: evmos.cosmosId,
//   [evmosTestnet.id]: evmosTestnet.cosmosId,
// } as const;

// const ADDRESS_ENCODERS: Record<
//   keyof typeof COSMOS_ID_MAP,
//   (address: string) => string
// > = {
//   [evmos.id]: ethToEvmos,
//   [evmosTestnet.id]: ethToEvmos,
// };

const TransactionRequestSchema = z
  .object({
    from: z.custom<Hex>(isHex),
    to: z.custom<Hex>(isHex),
  })
  .passthrough();

const prepareTransaction = async (
  chainId: number,
  request: TransactionRequest
): Promise<UnsignedTransaction> => {
  const client = getPublicClient({
    chainId,
  });
  const account = parseAccount(request.from);
  const { baseFeePerGas } = await client.getBlock({
    blockTag: "latest",
  });
  const nonce =
    request.nonce ??
    (await client.getTransactionCount({
      address: account.address,
      blockTag: "pending",
    }));
  const transaction: UnsignedTransaction = {
    data: request.data,
    to: request.to,
    value: request.value,
    nonce,
    chainId,
  };

  if (!baseFeePerGas) {
    return transaction;
  }
  // EIP-1559 fees
  // const estimatedMaxPriorityFeePerGas =
  //   await client.estimateMaxPriorityFeePerGas();
  const maxPriorityFeePerGas =
    request.maxPriorityFeePerGas ??
    (await client.estimateMaxPriorityFeePerGas()); //request.maxPriorityFeePerGas ?? 1_500_000_000n; // 1.5 gwei;

  const maxFeePerGas = (baseFeePerGas * 120n) / 100n + maxPriorityFeePerGas;

  const gas =
    request.gas ??
    (await client.estimateGas({
      ...request,
      account: { address: account.address, type: "json-rpc" },
    }));

  return {
    ...transaction,
    type: 2,
    gasLimit: isHex(gas) ? gas : toHex(gas),
    maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
    maxFeePerGas: toHex(maxFeePerGas),
  };
};

export class KeplrConnector extends Connector<Keplr, {}> {
  readonly id = "keplr";
  readonly name = "Keplr";
  readonly ready = true;
  provider: Keplr | null = null;
  offlineSigner: (OfflineAminoSigner & OfflineDirectSigner) | null = null;

  /**
   * Keplr deals with networks differently
   * In a way you're always connected
   * to all networks at once with your keystore wallet
   * so we handle the active chain here, and use that to know which
   * chain user actions should be applied to.
   */
  chainId: number = -1;

  constructor(config: { chains?: Chain[] }) {
    super({
      ...config,
      options: {},
    });
    this.onAccountsChanged = this.onAccountsChanged.bind(this);
  }

  async getPubkey({ cosmosChainId }: { cosmosChainId?: string } = {}) {
    const provider = await this.getProvider();
    const { pubKey } = await provider.getKey(
      cosmosChainId ?? (await this.getCosmosId())
    );
    return pubKey;
  }
  async getProvider() {
    if (this.provider) return this.provider;
    const provider = await getKeplrProvider();
    provider.defaultOptions = {
      sign: {
        preferNoSetFee: true,
      },
    };
    this.provider = provider;

    return provider;
  }
  async getSigner() {
    if (this.offlineSigner) return this.offlineSigner;
    const provider = await this.getProvider();

    const cosmosId = evmosInfo.cosmosId;
    if (cosmosId !== "evmos_9001-2") {
      await provider.experimentalSuggestChain(
        await import("@evmosapps/registry/src/keplr/evmoslocal.json")
      );
      await provider.experimentalSuggestChain(
        await import("@evmosapps/registry/src/keplr/evmostestnet.json")
      );
    }
    assertIf(cosmosId, "UNSUPPORTED_NETWORK");

    const signer = provider.getOfflineSigner(cosmosId);
    this.offlineSigner = signer;
    return signer;
  }

  getAccount = async () => {
    const signer = await this.getSigner();
    const [account] = await signer.getAccounts();
    assertIf(account, "ACCOUNT_NOT_FOUND");
    return evmosToEth(account.address) as Address;
  };
  // This has to be a promise to conform to the interface
  // eslint-disable-next-line @typescript-eslint/require-await
  async getChainId(): Promise<number> {
    return this.chainId;
  }

  async connect(config?: { chainId?: number }) {
    // TODO: Add event listeners here

    const account = await this.getAccount();
    const chainId = config?.chainId ?? evmosInfo.id;

    // if (!chainId ) {
    //   chainId = this.chains.find(({ id }) => id === )?.id;
    //   assertIf(chainId, "UNSUPPORTED_NETWORK");
    // }
    this.chainId = chainId;
    window.addEventListener("keplr_keystorechange", this.onAccountsChanged);
    return {
      account,
      chain: {
        id: chainId,
        unsupported: chainId !== evmosInfo.id,
      },
    };
  }
  // This has to be a promise to conform to the interface
  // eslint-disable-next-line @typescript-eslint/require-await
  async disconnect() {
    window.removeEventListener("keplr_keystorechange", this.onAccountsChanged);
  }
  async isAuthorized() {
    if (this.storage?.getItem("wallet") !== this.id) return false;
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }
  protected isChainUnsupported(chainId: number) {
    return chainId === evmosInfo.id;
  }
  async getCosmosId(chainId?: number) {
    chainId ??= await this.getChainId();

    assertIf(this.isChainUnsupported(chainId), "UNSUPPORTED_NETWORK");

    return evmosInfo.cosmosId;
  }
  async getWalletClient({ chainId }: { chainId?: number } = {}) {
    chainId ??= await this.getChainId();

    assertIf(this.isChainUnsupported(chainId), "UNSUPPORTED_NETWORK");

    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ]);
    const chain =
      this.chains.find((x) => x.id === chainId) ?? raise("UNSUPPORTED_NETWORK");

    if (!provider) throw new Error("provider is required.");
    // const self = this;
    const httpTransport = http(undefined);
    const transport = httpTransport({
      chain,
    });

    const request = async (args: {
      method: string;
      params: string[];
    }): Promise<unknown> => {
      const response = await this.request(args);
      if (response !== null) {
        return response;
      }

      return await transport.request(args);
    };
    return createWalletClient({
      account,
      chain,
      transport: custom({
        request,
      }),
    });
  }
  request = async ({
    method,
    params,
  }: {
    method: string;
    params: unknown[];
  }) => {
    const [provider, account, chainId] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
      this.getChainId(),
    ]);

    const cosmosId = await this.getCosmosId(chainId);
    const bech32Address = ethToEvmos(account);

    switch (method) {
      case "eth_sendTransaction": {
        const tx = TransactionRequestSchema.parse(params[0]);

        const request = await prepareTransaction(chainId, tx);

        const signature = await this.request({
          method: "account_signTransaction",
          params: [JSON.stringify(request)],
        });
        assertIf(isHex(signature), "FAILED_TO_SIGN_TRANSACTION");
        const message = serialize(request, signature);
        assertIf(isHex(message), "FAILED_TO_SERIALIZE_TRANSACTION");
        const walletClient = await this.getWalletClient();
        return await walletClient.request({
          method: "eth_sendRawTransaction",
          params: [message],
        });
      }

      case "eth_chainId": {
        return chainId;
      }
      case "account_signTransaction":
      case "personal_sign": {
        assertIf(isString(params[0]), "INVALID_MESSAGE");

        const signature = await provider.signEthereum(
          cosmosId,
          bech32Address,
          params[0],
          method === "account_signTransaction"
            ? EthSignType.TRANSACTION
            : EthSignType.MESSAGE
        );

        return toHex(signature);
      }

      case "eth_signTypedData_v4": {
        assertIf(isString(params[1]), "INVALID_MESSAGE");
        const signature = await provider.signEthereum(
          cosmosId,
          bech32Address,
          params[1],
          EthSignType.EIP712
        );
        return toHex(signature);
      }
    }
    return null;
  };

  protected onAccountsChanged = async () => {
    this.emit("change", {
      account: await this.getAccount(),
    });
    // throw new Error("Method not implemented.");
  };
  protected onChainChanged(): void {
    throw new Error("Method not implemented.");
  }
  protected onDisconnect(): void {}
  // This has to be a promise to conform to the interface
  // eslint-disable-next-line @typescript-eslint/require-await
  async switchChain(chainId: number): Promise<Chain> {
    const chain = this.chains.find(({ id }) => id === chainId);
    assertIf(chain, "UNSUPPORTED_NETWORK");
    if (chainId === this.chainId) return chain;
    this.chainId = chainId;
    this.offlineSigner = null;
    return chain;
  }
}
