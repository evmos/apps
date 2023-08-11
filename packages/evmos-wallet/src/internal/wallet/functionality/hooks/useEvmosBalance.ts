// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StoreType } from "../../../../redux/Store";
import { BigNumber } from "@ethersproject/bignumber";
import { getEvmosBalance } from "../fetch";
import { BalanceResponse } from "../types";

export const useEvmosBalance = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const evmosBalance = useQuery<BalanceResponse, Error>({
    queryKey: ["evmosBalance", value.evmosAddressCosmosFormat],
    queryFn: () => getEvmosBalance(value.evmosAddressCosmosFormat),
    refetchInterval: 3000,
  });

  let balance = BigNumber.from(0);
  if (evmosBalance.data !== undefined) {
    const amount = evmosBalance.data.balance.amount;
    if (amount !== "") {
      balance = BigNumber.from(amount);
    }
  }

  return { evmosBalance: balance };
};
