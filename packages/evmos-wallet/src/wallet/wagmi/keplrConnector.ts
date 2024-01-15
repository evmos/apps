import {
  getKeplrProvider,
  normalizeToCosmosAddress,
  normalizeToEth,
} from "../utils";
import { getEvmosChainInfo } from "./chains";
import { isUndefined, raise } from "helpers";
import {
  EIP1474Methods,
  createPublicClient,
  hexToSignature,
  http,
  toHex,
} from "viem";
import { EthSignType } from "@keplr-wallet/types";
import { fromHex, isHex, parseAccount, serializeTransaction } from "viem/utils";
import { omit, uniqueId } from "lodash-es";
import { estimateFeesPerGas, estimateGas } from "viem/actions";
import { createConnector } from "wagmi";

const evmos = getEvmosChainInfo();
type ByMethod<M extends string> = Extract<
  EIP1474Methods[number],
  { Method: M }
>;
type EIP1474ReturnType<M extends string> = ByMethod<M>["ReturnType"];
type EIP1474Parameters<M extends string> = ByMethod<M>["Parameters"];

const eth_requestAccounts = async () => {
  const provider = await getKeplrProvider();
  const signer = provider.getOfflineSigner(evmos.cosmosId);
  const [account = raise("Account not found")] = await signer.getAccounts();
  return [normalizeToEth(account.address)] as const;
};

const wallet_requestPermissions = (
  request: EIP1474Parameters<"wallet_requestPermissions">
): Promise<EIP1474ReturnType<"wallet_requestPermissions">> => {
  return Promise.all(
    request.map(async ({}) => ({
      id: uniqueId("keplr"),
      parentCapability: "eth_accounts",

      invoker: "https://wallet.keplr.app",

      caveats: [
        {
          type: "restrictReturnedAccounts",
          value: await eth_requestAccounts(),
        },
      ],
      date: Date.now(),
    }))
  );
};

const eth_chainId = () => {
  return evmos.id;
};

const signTransaction = async (
  parameters: [string],
  signType: EthSignType
): Promise<EIP1474ReturnType<"personal_sign">> => {
  const cosmosId = evmos.cosmosId;

  const [account] = await eth_requestAccounts();
  const keplr = await getKeplrProvider();
  const signature = await keplr.signEthereum(
    cosmosId,
    normalizeToCosmosAddress(account),
    parameters[0],
    signType
  );

  return toHex(signature);
};
const eth_signTypedData_v4 = async (
  parameters: EIP1474Parameters<"eth_signTypedData_v4">
): Promise<EIP1474ReturnType<"eth_signTypedData_v4">> => {
  const keplr = await getKeplrProvider();
  const cosmosId = evmos.cosmosId;
  const [account, message] = parameters;
  const signature = await keplr.signEthereum(
    cosmosId,
    normalizeToCosmosAddress(account),
    message,
    EthSignType.EIP712
  );

  return toHex(signature);
};

const prepareTransactionForKeplr = async (
  chainId: number,
  request: EIP1474Parameters<"eth_sendTransaction">[0]
) => {
  const client = createPublicClient({
    chain: evmos,
    transport: http(),
  });
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

const eth_sendTransaction = async ([
  request,
]: EIP1474Parameters<"eth_sendTransaction">): Promise<
  EIP1474ReturnType<"eth_sendTransaction">
> => {
  const transaction = await prepareTransactionForKeplr(evmos.id, request);
  const signature = await signTransaction(
    [JSON.stringify(transaction)],
    EthSignType.TRANSACTION
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
      maxPriorityFeePerGas: fromHex(transaction.maxPriorityFeePerGas, "bigint"),
    },
    hexToSignature(signature)
  );
  const client = createPublicClient({
    chain: evmos,
    transport: http(),
  });

  return client.request({
    method: "eth_sendRawTransaction",
    params: [message],
  });
};

export const keplr = createConnector<
  unknown,
  {},
  {
    keplrConnectorStatus: "authorized";
  }
>(({ emitter, storage }) => {
  if (typeof window !== "undefined") {
    window.addEventListener("keplr_keystorechange", async () => {
      const accounts = await eth_requestAccounts();
      emitter.emit("change", {
        accounts,
        chainId: eth_chainId(),
      });
    });
  }

  const listeners = new Map<string, Set<(...args: any[]) => void>>();

  const provider = {
    request({ method, params }: { method: string; params?: unknown[] }) {
      if (method === "eth_requestAccounts" || method === "eth_accounts") {
        return eth_requestAccounts();
      }

      if (method === "wallet_requestPermissions") {
        return wallet_requestPermissions(params as never) as never;
      }
      if (method === "eth_chainId") {
        return eth_chainId() as never;
      }
      if (method === "personal_sign") {
        return signTransaction(params as never, EthSignType.MESSAGE) as never;
      }
      if (method === "eth_sendTransaction") {
        return eth_sendTransaction(params as never) as never;
      }
      if (method === "eth_signTypedData_v4") {
        return eth_signTypedData_v4(params as never) as never;
      }

      throw new Error(`${method} Method not implemented.`);
    },
    _state: {
      accounts: [],
      isConnected: false,
      chainId: "",
    },

    on(event: string, listener: (...args: unknown[]) => void) {
      const listenersForEvent = listeners.get(event);
      if (listenersForEvent) {
        listenersForEvent.add(listener);
      } else {
        listeners.set(event, new Set([listener]));
      }
    },

    removeListener(event: string, listener: (...args: unknown[]) => void) {
      const listenersForEvent = listeners.get(event);
      if (listenersForEvent) {
        listenersForEvent.delete(listener);
      }
    },
  };

  return {
    id: "keplr",
    name: "Keplr",
    type: "injected",

    async connect({ chainId } = {}) {
      const accounts = await eth_requestAccounts();
      await storage?.setItem("keplrConnectorStatus", "authorized");
      return {
        accounts,
        chainId: chainId ?? eth_chainId(),
      };
    },
    async disconnect() {
      await storage?.removeItem("keplrConnectorStatus");
    },
    async getAccounts() {
      const status = await storage?.getItem("keplrConnectorStatus");
      if (status !== "authorized") {
        return [];
      }
      return await eth_requestAccounts();
    },
    async getChainId() {
      return Promise.resolve(eth_chainId());
    },
    getProvider() {
      return Promise.resolve(provider);
    },

    async isAuthorized() {
      return (await storage?.getItem("keplrConnectorStatus")) === "authorized";
    },

    onAccountsChanged() {},
    onChainChanged() {},
    onDisconnect() {},
  };
});
