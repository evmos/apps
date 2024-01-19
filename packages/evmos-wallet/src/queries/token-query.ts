// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { queryOptions } from "@tanstack/react-query";
import { fetchToken } from "../server/fetch-token.server";
import { raise } from "helpers";

export const TokenQueryOptions = (denom?: string) =>
  queryOptions({
    staleTime: Infinity,
    queryKey: ["token", denom],
    queryFn: () => fetchToken(denom ?? raise("Denom not found")),
    enabled: !!denom,
  });
