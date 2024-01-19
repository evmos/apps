// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { Address } from "../../wallet";
import { getAccountBalances } from "../get-account-balances";
import { Prefix } from "../types";

import { queryOptions } from "@tanstack/react-query";

export const AccountBalancesQueryOptions = (address?: Address<Prefix>) =>
  queryOptions({
    queryKey: ["accountBalances", address],
    refetchInterval: 1000 * 60,
    queryFn: () => {
      if (!address) return [];

      return getAccountBalances({ address });
    },
    enabled: !!address,
  });
export const useAccountBalances = (address?: Address<Prefix>) => {
  // const { data: accountExists } = useAccountExists(address);
  return useQuery(AccountBalancesQueryOptions(address));
};
