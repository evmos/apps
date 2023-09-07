import { Address } from "../../wallet";
import { Prefix, TokenMinDenom } from "../types";
import { useAccountBalances } from "./use-account-balances";

export const useTokenBalance = (
  address?: Address<Prefix>,
  denom?: TokenMinDenom
) => {
  const { data, ...rest } = useAccountBalances(address);

  const balance =
    data && denom ? data.find(({ minDenom }) => minDenom === denom) : undefined;
  return {
    ...rest,
    balance,
  };
};
