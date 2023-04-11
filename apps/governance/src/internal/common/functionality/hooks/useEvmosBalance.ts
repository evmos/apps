import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StoreType } from "evmos-wallet";
import { BIG_ZERO } from "../../../common/math/Bignumbers";
import { BigNumber } from "ethers";
import { getEvmosBalance } from "./fetch";
import { BalanceResponse } from "./types";
export const useEvmosBalance = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const evmosBalance = useQuery<BalanceResponse, Error>({
    queryKey: ["evmosBalance", value.evmosAddressCosmosFormat],
    queryFn: () => getEvmosBalance(value.evmosAddressCosmosFormat),
    refetchInterval: 3000,
  });

  let balance = BIG_ZERO;
  if (evmosBalance.data !== undefined) {
    const amount = evmosBalance.data.balance.amount;
    if (amount !== "") {
      balance = BigNumber.from(amount);
    }
  }

  return { evmosBalance: balance };
};
