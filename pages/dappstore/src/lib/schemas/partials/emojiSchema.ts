import { z } from "zod";

export const emojiSchema = z.object({
  type: z.literal("emoji"),
  emoji: z.string(),
});
