// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

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

type DelegationBalanceResponse = {
  denom: string;
  amount: string;
};

export type DelegationsResponse = {
  delegation: delegationResponse;
  balance: DelegationBalanceResponse;
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

export type rewardsResponse = {
  rewards: Rewards[];
  total: totalRewards[];
};

export type StakingInfoResponse = {
  delegations: DelegationsResponse[];
  undelegations: UndelegationsResponse[];
  rewards: rewardsResponse;
};

export type BalanceResponse = {
  balance: {
    denom: string;
    amount: string;
  };
};

export type ValidatorsList = {
  validator: ValidatorResponse;
  balance: BalanceResponse;
};

export type ModalDelegate = {
  moniker: string;
  commissionRate: string;
  balance: string;
  details: string;
  website: string;
  validatorAddress: string;
};

export type ModalCancelUndelegations = {
  creationHeight: string;
  validatorAddress: string;
  balance: string;
};
