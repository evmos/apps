// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const emojiSchema = z.object({
  type: z.literal("emoji"),
  emoji: z.string(),
});
