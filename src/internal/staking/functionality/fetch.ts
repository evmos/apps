import {
  EVMOS_BACKEND,
  EVMOS_MINIMAL_COIN_DENOM,
  EVMOS_SYMBOL,
} from "../../wallet/functionality/networkConfig";
import { BalanceResponse, StakingInfoResponse } from "./types";

export const getStakingInfo = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return {
      delegations: [],
      undelegations: [],
      rewards: { rewards: [], total: [] },
    };
  }
  const res = await fetch(`${EVMOS_BACKEND}/stakingInfo/${address}`);
  return res.json() as Promise<StakingInfoResponse>;
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
