import { z } from "zod";

export const checkboxSchema = z
  .object({
    checkbox: z.boolean(),
  })
  .transform(({ checkbox }) => checkbox);
