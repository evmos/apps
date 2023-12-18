// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StoreType } from "../../../../redux/Store";
import { BigNumber } from "@ethersproject/bignumber";
import { getEvmosBalance } from "../fetch";
import { BalanceResponse } from "../types";
import { useMemo } from "react";
import { txStatusError } from "../../../../notification/transactionsTypes";

export const useEvmosBalance = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const evmosBalance = useQuery<BalanceResponse | txStatusError, Error>({
    queryKey: ["evmosBalance", value.evmosAddressCosmosFormat],
    queryFn: () => getEvmosBalance(value.evmosAddressCosmosFormat),
    refetchInterval: 15_000,
  });

  const tempEvmosBalance = useMemo(() => {
    let balance = BigNumber.from(0);
    if (evmosBalance.data !== undefined) {
      if ("code" in evmosBalance.data) {
        return BigNumber.from(-1);
      }
      const amount = evmosBalance.data.balance?.amount;
      if (amount !== "") {
        balance = BigNumber.from(amount);
      }
    }
    return balance;
  }, [evmosBalance]);

  return { evmosBalance: tempEvmosBalance };
};
