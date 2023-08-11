import { fetchEvmosApi } from "./fetchEvmosApi";
import { E, raise } from "helpers";
import { z } from "zod";

export const makeApiRequester =
  <
    TParams,
    TBody extends Record<string, unknown>,
    TSchema extends z.ZodType<unknown>,
  >(
    apiEndpoint: string,
    transformParameters: (params: TParams) => TBody,
    schema: TSchema
  ) =>
  async (params: TParams) => {
    const [, response] = await E.try(() =>
      fetchEvmosApi("POST", apiEndpoint, schema, transformParameters(params))
    );
    return (
      response ||
      raise(
        `STAKING_${apiEndpoint
          .split("/")
          .filter(Boolean)
          .join("_")
          .toUpperCase()}_TRANSACTION_REQUEST_FAILED`
      )
    );
  };
