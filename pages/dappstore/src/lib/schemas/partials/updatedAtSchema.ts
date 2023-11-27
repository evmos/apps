import { z } from "zod";

export const updatedAtSchema = z
  .object({
    last_edited_time: z.string(),
  })
  .transform(({ last_edited_time }) => last_edited_time);
