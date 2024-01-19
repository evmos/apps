// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const createdAtSchema = z
  .object({
    created_time: z.string(),
  })
  .transform(({ created_time }) => created_time);
