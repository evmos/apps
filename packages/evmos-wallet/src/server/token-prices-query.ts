import { queryOptions } from "@tanstack/react-query";
import { fetchTokenPrices } from "./fetch-token-prices";

export const TokenPricesQueryOptions = () =>
  queryOptions({
    refetchInterval: 5 * 60 * 1000,
    queryKey: ["tokenPrices"],
    queryFn: () => fetchTokenPrices(),
  });
