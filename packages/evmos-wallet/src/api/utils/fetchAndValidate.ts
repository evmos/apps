import { z } from "zod";

export async function fetchAndValidate<TSchema extends z.ZodType<unknown>>(
  schema: TSchema,
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<z.infer<TSchema>> {
  const response = await fetch(input, init);
  const json = (await response.json()) as unknown;
  return schema.parse(json);
}
