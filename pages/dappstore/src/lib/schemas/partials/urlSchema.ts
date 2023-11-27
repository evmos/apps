import { z } from "zod";

export const urlSchema = z
  .object({
    url: z.string().nullable(),
  })
  .transform(({ url }) => url);
