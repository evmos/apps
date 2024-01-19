// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const relationSchema = z
  .object({
    relation: z.array(
      z.object({
        id: z.string(),
      }),
    ),
  })
  .transform((data) => {
    return data.relation.map((relation) => relation.id);
  });
