// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getEvmosBalance } from "../fetch";
import { StoreType, txStatusError } from "@evmosapps/evmos-wallet";
import { BalanceResponse } from "../types";
import { BigNumber } from "@ethersproject/bignumber";

export const useEvmosBalance = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const evmosBalance = useQuery<BalanceResponse | txStatusError, Error>({
    queryKey: ["evmosBalance", value.evmosAddressCosmosFormat],
    queryFn: () => getEvmosBalance(value.evmosAddressCosmosFormat),
    refetchInterval: 15_000,
  });

  let balance = BigNumber.from(0);
  if (evmosBalance.data !== undefined) {
    if ("code" in evmosBalance.data) {
      return { evmosBalance: BigNumber.from(-1) };
    }
    const amount = evmosBalance.data.balance.amount;
    if (amount !== "") {
      balance = BigNumber.from(amount);
    }
  }

  return { evmosBalance: balance };
};
