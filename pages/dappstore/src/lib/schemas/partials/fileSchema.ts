import { z } from "zod";

export const fileSchema = z
  .object({
    type: z.literal("file"),
    file: z.object({
      url: z.string(),
    }),
  })
  .transform(({ type, file }) => ({
    type,
    url: file.url,
  }));
