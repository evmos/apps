// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StoreType } from "evmos-wallet";
import { BigNumber } from "@ethersproject/bignumber";
import {
  EVMOS_BACKEND,
  EVMOS_MINIMAL_COIN_DENOM,
  EVMOS_SYMBOL,
} from "evmos-wallet";

type BalanceResponse = {
  balance: {
    denom: string;
    amount: string;
  };
};
export const getEvmosBalance = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return { balance: { denom: "", amount: "" } };
  }
  const res = await fetch(
    `${EVMOS_BACKEND}/BalanceByDenom/${EVMOS_SYMBOL}/${address}/${EVMOS_MINIMAL_COIN_DENOM}`
  );
  return res.json() as Promise<BalanceResponse>;
};

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
