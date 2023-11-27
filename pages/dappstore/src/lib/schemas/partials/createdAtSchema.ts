import { z } from "zod";

export const createdAtSchema = z
  .object({
    created_time: z.string(),
  })
  .transform(({ created_time }) => created_time);
