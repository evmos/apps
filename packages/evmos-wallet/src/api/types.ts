// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export type ERC20Element = {
  name: string;
  cosmosBalance: string;
  decimals: string;
  description: string;
  erc20Balance: string;
  symbol: string;
  tokenName: string;
  chainId: string;
  chainIdentifier: string;
  // Currently only axelar assets are external actions
  handledByExternalUI: null | { handlingAction: string; url: string }[];
  coingeckoPrice: string;
  prefix: string;
  pngSrc: string;
  erc20Address: string;
  tokenIdentifier: string;
  price24HChange: string;
};

export type ERC20BalanceResponse = {
  balance: ERC20Element[];
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

type ValidatorResponse = {
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
