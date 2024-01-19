// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { getAccountBalances } from "@evmosapps/evmos-wallet/src/registry-actions/get-account-balances";
import { queryOptions } from "@tanstack/react-query";
import { getTokenByRef } from "@evmosapps/evmos-wallet/src/registry-actions/get-token-by-ref";
import { makeBalance } from "@evmosapps/evmos-wallet/src/registry-actions/utils";

import { isUndefined } from "helpers";
import { TokenBalanceProps } from "./ConvertModalContent";

export function tokenBalanceQueryOptions({
  address,
  token,
  tokenType = "ICS20",
}: Partial<TokenBalanceProps>) {
  const enabled =
    !isUndefined(address) && !isUndefined(token) && !isUndefined(tokenType);
  return queryOptions({
    queryKey: ["accountBalances", address],
    queryFn: () => {
      if (!enabled) throw new Error("Invalid props");

      return getAccountBalances({ address });
    },
    select: (data) => {
      if (!enabled) throw new Error("Invalid props");

      return (
        data.find((b) => b.tokenRef === token && b.type === tokenType) ??
        makeBalance(getTokenByRef(token), address, 0n, tokenType)
      );
    },
    enabled,
  });
}
