// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo } from "react";
import { Address } from "../../wallet";
import { Prefix, TokenRef } from "../types";
import { useAccountBalances } from "./use-account-balances";
import { makeBalance } from "../utils";
import { getTokenByRef } from "../get-token-by-ref";

export const useTokenBalance = (
  address?: Address<Prefix>,
  tokenRef?: TokenRef,
) => {
  const { data, ...rest } = useAccountBalances(address);

  const balance = useMemo(() => {
    if (!data || !tokenRef || !address) return undefined;
    return (
      data.find((balance) => {
        if (tokenRef === "evmos:EVMOS") {
          return balance.tokenRef == "evmos:EVMOS" && balance.type === "ICS20";
        }
        return tokenRef === balance.tokenRef;
      }) ?? makeBalance(getTokenByRef(tokenRef), address, 0n, "ICS20")
    );
  }, [data, tokenRef, address]);

  return {
    ...rest,
    balance,
  };
};
