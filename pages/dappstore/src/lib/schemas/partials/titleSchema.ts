import { z } from "zod";

export const titleSchema = z
  .object({
    title: z.array(
      z.object({
        plain_text: z.string(),
      })
    ),
  })
  .transform((data) => {
    return data.title.map((text) => text.plain_text).join(" ");
  });
