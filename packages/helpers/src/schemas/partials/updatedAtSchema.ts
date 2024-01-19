// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const updatedAtSchema = z
  .object({
    last_edited_time: z.string(),
  })
  .transform(({ last_edited_time }) => last_edited_time);
