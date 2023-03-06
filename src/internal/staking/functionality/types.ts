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

type delegationResponse = {
  delegator_address: string;
  rank: number;
  shares: string;
  validator: ValidatorResponse;
  validator_address: string;
};

type BalanceResponse = {
  denom: string;
  amount: string;
};
export type DelegationsResponse = {
  delegation: delegationResponse;
  balance: BalanceResponse;
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
  validator: ValidatorResponse;
  validator_address: string;
};

type totalRewards = {
  amount: string;
  denom: string;
};

type RewardResponse = {
  denom: string;
  amount: string;
};

type Rewards = {
  reward: RewardResponse[];
  validator_address: string;
};

type rewardsResponse = {
  rewards: Rewards[];
  total: totalRewards[];
};

export type StakingInfoResponse = {
  delegations: DelegationsResponse[];
  undelegations: UndelegationsResponse[];
  rewards: rewardsResponse;
};
