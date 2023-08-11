import { z } from "zod";
import { protoTxNamespace } from "@evmos/proto";
import { makeApiRequester } from "./utils";
import { StdSignDoc, StdSignature } from "@keplr-wallet/types";
import { raise } from "helpers";
import { EVMOS_NETWORK_FOR_BACKEND } from "../internal/wallet/functionality/networkConfig";

const BroadcastResponseSchema = z.union([
  z.object({
    error: z.string(),
    tx_hash: z.string().nullish(),
    code: z.number().nullish(),
  }),
  z.object({
    error: z.string().nullish(),
    tx_hash: z.string(),
    code: z.number().nullish(),
  }),
]);
export const apiBroadcastEip712 = makeApiRequester(
  "/broadcastEip712",
  (transaction: {
    chainId: number;
    feePayer: string;
    feePayerSig: string;
    body: Uint8Array;
    authInfo: Uint8Array;
  }) => ({
    ...transaction,
    body: Buffer.from(transaction.body).toString("base64"),
    authInfo: Buffer.from(transaction.authInfo).toString("base64"),
  }),
  BroadcastResponseSchema.transform(({ error, tx_hash }) => {
    if (error || !tx_hash) {
      raise("BROADCAST_EIP712_FAILED");
    }
    return tx_hash;
  })
);

export const apiBroadcastRawTx = makeApiRequester(
  "/v2/tx/broadcast",
  ({
    rawTx,
    network = EVMOS_NETWORK_FOR_BACKEND,
  }: {
    rawTx: {
      message: protoTxNamespace.txn.TxRaw;
      path: string;
    };
    network?: string;
  }) => {
    const message = rawTx.message.serializeBinary().toString();
    return JSON.parse(
      `{ "tx_bytes": [${message}], "network": "${network}" }`
    ) as {
      tx_bytes: number[];
      network: string;
    };
  },
  BroadcastResponseSchema.transform((data) => {
    if (data.error) {
      raise("BROADCAST_BYTES_FAILED");
    }
    return data.tx_hash;
  })
);

export const apiBroadcastAmino = makeApiRequester(
  "/v2/tx/amino/broadcast",
  (args: { signature: StdSignature; signed: StdSignDoc; network: string }) => ({
    ...args,
    network: args.network.toUpperCase(),
  }),
  BroadcastResponseSchema.transform((data) => {
    if (data.error) {
      raise("BROADCAST_AMINO_FAILED");
    }
    return data.tx_hash;
  })
);
