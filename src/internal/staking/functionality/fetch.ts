import { EVMOS_BACKEND } from "../../wallet/functionality/networkConfig";

type commission_rates = {
  max_change_rate: string;
  max_rate: string;
  rate: string;
};

type commission = {
  commission_rates: commission_rates;
  update_time: string;
};

type consensusPubKey = {
  type_url: string;
  value: string;
};

type description = {
  details: string;
  identity: string;
  moniker: string;
  security_contract: string;
  website: string;
};

export type ValidatorResponse = {
  commission: commission;
  consensus_key: consensusPubKey;
  delegator_shares: string;
  description: description;
  jailed: boolean;
  min_self_delegation: string;
  operator_address: string;
  rank: number;
  status: string;
  tokens: string;
  unbonding_height: string;
  unbonding_time: string;
};

export type ValidatorsResponse = {
  values: ValidatorResponse[];
};

export const getAllValidators = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/AllValidators`);
  return res.json() as Promise<ValidatorsResponse>;
};
