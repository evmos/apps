import { z } from "zod";
import { fetchAndValidate } from "./fetchAndValidate";
import { EVMOS_BACKEND } from "../../internal/wallet/functionality/networkConfig";

export async function fetchEvmosApi<TSchema extends z.ZodType<unknown>>(
  method: "GET" | "POST",
  pathname: string,
  schema: TSchema,
  body: Record<string, unknown>,
  init?: RequestInit & { apiUrl?: string }
) {
  const config = Object.assign(
    {
      body: JSON.stringify(body),
      method,
    },
    init,
    {
      headers: Object.assign(
        {
          "Content-Type": "application/json",
        },
        init?.headers
      ),
    }
  );
  return await fetchAndValidate<TSchema>(
    schema,
    `${config.apiUrl ?? EVMOS_BACKEND}${pathname}`,
    config
  );
}
