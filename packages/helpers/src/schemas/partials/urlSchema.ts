// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const urlSchema = z
  .object({
    url: z.string().nullable(),
  })
  .transform(({ url }) => url);
