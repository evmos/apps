import { queryOptions } from "@tanstack/react-query";
import { fetchToken } from "./fetch-token.server";
import { raise } from "helpers";

export const TokenQueryOptions = (denom?: string) =>
  queryOptions({
    staleTime: Infinity,
    queryKey: ["token", denom],
    queryFn: () => fetchToken(denom ?? raise("Denom not found")),
    enabled: !!denom,
  });
