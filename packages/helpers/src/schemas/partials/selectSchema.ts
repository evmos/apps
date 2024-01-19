// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const selectSchema = z
  .object({
    select: z.union([
      z.object({
        name: z.string(),
      }),
      z.null(),
    ]),
  })
  .transform(({ select }) => select?.name ?? null);
