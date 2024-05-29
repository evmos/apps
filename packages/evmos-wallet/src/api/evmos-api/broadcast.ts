// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import type { createTxRaw } from "@evmos/proto";

import { raise } from "helpers";
import { EVMOS_NETWORK_FOR_BACKEND } from "@evmosapps/constants";
import { makeApiRequester } from "../utils/makeApiRequester";

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
  }),
);

export const apiBroadcastRawTx = makeApiRequester(
  "/v2/tx/broadcast",
  ({
    rawTx,
    network = EVMOS_NETWORK_FOR_BACKEND,
  }: {
    rawTx: ReturnType<typeof createTxRaw>;
    network?: string;
  }) => {
    const message = rawTx.message.serializeBinary().toString();
    return JSON.parse(
      `{ "tx_bytes": [${message}], "network": "${network}" }`,
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
  }),
);
