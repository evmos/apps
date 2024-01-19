// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const LegacyAminoSchema = z
  .object({
    account_number: z.string(),
    chain_id: z.string(),
    fee: z.object({
      amount: z.array(
        z.object({
          amount: z.string(),
          denom: z.string(),
        }),
      ),
      gas: z.string(),
    }),
    memo: z.string(),
    msgs: z.array(
      z.object({
        type: z.string(),
        value: z.union([
          z.object({}).passthrough(),
          z.string(),
          z.number(),
          z.boolean(),
          z.null(),
          z.array(z.unknown()),
        ]),
      }),
    ),
    sequence: z.string(),
  })
  .passthrough();
