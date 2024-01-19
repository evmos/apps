// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const externalSchema = z
  .object({
    type: z.literal("external"),
    external: z.object({
      url: z.string(),
    }),
  })
  .transform(({ type, external }) => ({
    type,
    url: external.url,
  }));
