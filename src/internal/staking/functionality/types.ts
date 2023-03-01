type comissionRates = {
  max_change_rate: string;
  max_rate: string;
  rate: string;
};

type comission = {
  comission_rates: comissionRates;
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

type validatorResponse = {
  comission: comission;
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

type delegationsResponse = {
  delegator_address: string;
  rank: number;
  shares: string;
  validator: validatorResponse;
  validator_address: string;
};

type entries = {
  balance: string;
  completion_time: string;
  creation_height: string;
  initial_balance: string;
};

export type UndelegationsResponse = {
  delegator_address: string;
  entries: entries[];
  validator: validatorResponse;
  validator_address: string;
};

export type StakingInfoResponse = {
  delegations: delegationsResponse[];
  undelegations: UndelegationsResponse[];
};

export type BalanceResponse = {
  balance: {
    denom: string;
    amount: string;
  };
};

type RewardResponse = {
  denom: string;
  amount: string;
};

type RewardsResponse = {
  reward: RewardResponse[];
  validator_address: string;
};

type TotalStakingRewards = {
  amount: string;
  denom: string;
};

export type StakingRewardsResponse = {
  rewards: RewardsResponse[];
  total: TotalStakingRewards[];
};
