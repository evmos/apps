import { z } from "zod";

export const relationSchema = z
  .object({
    relation: z.array(
      z.object({
        id: z.string(),
      })
    ),
  })
  .transform((data) => {
    return data.relation.map((relation) => relation.id);
  });
