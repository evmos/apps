import { z } from "zod";

export const richTextSchema = z
  .object({
    rich_text: z.array(
      z.object({
        plain_text: z.string(),
      })
    ),
  })
  .transform((data) => {
    return data.rich_text.map((text) => text.plain_text).join(" ");
  });
