// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { apiCosmosFetch } from "./api-cosmos-fetch";
import { BigIntSchema } from "./validation";
import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";

export const apiCosmosTxSimulate = (
  urls: Readonly<[string, ...string[]]>,
  tx: Tx,
) =>
  apiCosmosFetch(
    z
      .object({
        gas_info: z.object({
          gas_wanted: BigIntSchema,
          gas_used: BigIntSchema,
        }),
        result: z.object({
          data: z.string(),
          log: z.string(),
          events: z.array(
            z.object({
              type: z.string(),
              attributes: z.unknown(),
            }),
          ),
        }),
      })
      .passthrough(),
    urls,
    `/cosmos/tx/v1beta1/simulate`,
    {
      method: "POST",
      body: JSON.stringify({
        tx_bytes: Buffer.from(tx.toBinary()).toString("base64"),
      }),
    },
  );
