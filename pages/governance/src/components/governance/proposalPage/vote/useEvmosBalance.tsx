// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StoreType, txStatusError } from "@evmosapps/evmos-wallet";
import { BigNumber } from "@ethersproject/bignumber";
import {
  EVMOS_BACKEND,
  EVMOS_MINIMAL_COIN_DENOM,
  EVMOS_SYMBOL,
} from "@evmosapps/evmos-wallet";

type BalanceResponse = {
  balance: {
    denom: string;
    amount: string;
  };
};
const getEvmosBalance = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return { balance: { denom: "", amount: "" } };
  }
  const res = await fetch(
    `${EVMOS_BACKEND}/BalanceByDenom/${EVMOS_SYMBOL}/${address}/${EVMOS_MINIMAL_COIN_DENOM}`,
  );
  return res.json() as Promise<BalanceResponse | txStatusError>;
};

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
    const amount = evmosBalance.data.balance?.amount ?? "0";
    if (amount !== "") {
      balance = BigNumber.from(amount);
    }
  }

  return { evmosBalance: balance };
};
