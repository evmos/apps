import { z } from "zod";

export const selectSchema = z
  .object({
    select: z.union([
      z.object({
        name: z.string(),
      }),
      z.null(),
    ]),
  })
  .transform(({ select }) => select?.name ?? null);
