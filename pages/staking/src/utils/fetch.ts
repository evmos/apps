// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  EVMOS_BACKEND,
  EVMOS_MINIMAL_COIN_DENOM,
  EVMOS_SYMBOL,
  txStatusError,
} from "@evmosapps/evmos-wallet";
import {
  BalanceResponse,
  StakingInfoResponse,
  ValidatorResponse,
} from "./types";

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
    `${EVMOS_BACKEND}/BalanceByDenom/${EVMOS_SYMBOL}/${address}/${EVMOS_MINIMAL_COIN_DENOM}`,
  );
  return res.json() as Promise<BalanceResponse | txStatusError>;
};

export type ValidatorsResponse = {
  values: ValidatorResponse[];
};

export const getAllValidators = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/AllValidators`);
  return res.json() as Promise<ValidatorsResponse>;
};
