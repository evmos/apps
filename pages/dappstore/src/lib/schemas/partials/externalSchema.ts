import { z } from "zod";

export const externalSchema = z
  .object({
    type: z.literal("external"),
    external: z.object({
      url: z.string(),
    }),
  })
  .transform(({ type, external }) => ({
    type,
    url: external.url,
  }));
