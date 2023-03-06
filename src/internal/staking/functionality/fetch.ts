import { EVMOS_BACKEND } from "../../wallet/functionality/networkConfig";
import { StakingInfoResponse, ValidatorResponse } from "./types";

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

export type ValidatorsResponse = {
  values: ValidatorResponse[];
};

export const getAllValidators = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/AllValidators`);
  return res.json() as Promise<ValidatorsResponse>;
};
