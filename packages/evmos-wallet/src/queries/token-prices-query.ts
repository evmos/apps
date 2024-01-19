// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { queryOptions } from "@tanstack/react-query";
import { fetchTokenPrices } from "../server/fetch-token-prices.server";

export const TokenPricesQueryOptions = () =>
  queryOptions({
    refetchInterval: 5 * 60 * 1000,
    queryKey: ["tokenPrices"],
    queryFn: () => fetchTokenPrices(),
  });
