// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { apiCosmosFetch } from "./api-cosmos-fetch";
import { BigIntSchema } from "./validation";
import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";
import { BroadcastMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/service_pb";

export const apiCosmosTxBroadcast = (
  urls: Readonly<[string, ...string[]]>,
  tx: Tx,
  mode: keyof typeof BroadcastMode = "SYNC",
) =>
  apiCosmosFetch(
    z
      .object({
        tx_response: z.object({
          height: z.string(),
          txhash: z.string(),
          codespace: z.string(),
          code: z.number(),
          data: z.string(),
          raw_log: z.string(),
          logs: z.array(z.unknown()),
          info: z.string(),
          gas_wanted: BigIntSchema,
          gas_used: BigIntSchema,
          tx: z.unknown(),
          timestamp: z.string(),
          events: z.array(z.unknown()),
        }),
      })
      .passthrough(),
    urls,
    `/cosmos/tx/v1beta1/txs`,
    {
      method: "POST",
      body: JSON.stringify({
        tx_bytes: Buffer.from(tx.toBinary()).toString("base64"),
        mode: BroadcastMode[mode],
      }),
    },
  );
