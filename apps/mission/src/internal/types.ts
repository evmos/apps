import { BigNumber } from "ethers";

export type RecordsResponse = {
  id: string;
  createdTime: string;
  fields: {
    Description: string;
    Name: string;
    "Web Link": string;
    Type: string;
    "Start Date Time": string;
    "Posted By": {
      id: string;
      email: string;
      name: string;
    };
  };
};

export type AnnouncementsResponse = {
  records: RecordsResponse[];
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
};

export type ERC20BalanceResponse = {
  balance: ERC20Element[];
};

export type BalanceResponse = {
  balance: {
    amount: string;
    denom: string;
  };
};

export type addAssetsType = {
  cosmosBalance: BigNumber;
  decimals: number;
  erc20Balance: BigNumber;
};

export interface addDolarsAssetsType extends addAssetsType {
  coingeckoPrice: number;
}

type AmountProposal = {
  denom: string;
  amount: string;
};

type MessageProposal = {
  "@type": string;
  authority: string;
  content: {
    "@type": string;
    amount: null | AmountProposal[];
    description: string;
    recipient: string;
    title: string;
  };
};

export type V1Proposals = {
  proposals: Proposal[];
  tally_params: TallyingProps;
};

export type Proposal = {
  deposit_end_time: string;
  final_tally_result: {
    yes_count: string;
    no_count: string;
    abstain_count: string;
    no_with_veto_count: string;
  };
  id: string;
  messages: MessageProposal[];
  status: string;
  submit_time: string;
  total_deposit: AmountProposal[];
  voting_end_time: string;
  voting_start_time: string;
};

export type ProposalProps = {
  id: string;
  title: string;
  status: string;
  votingStartTime: string;
  votingEndTime: string;
  tallyResults: string[];
};
// actualizar estos
export const PROPOSAL_STATUS_REJECTED = "PROPOSAL_STATUS_REJECTED";
export const PROPOSAL_STATUS_PASSED = "PROPOSAL_STATUS_PASSED";
export const PROPOSAL_STATUS_VOTING_PERIOD = "PROPOSAL_STATUS_VOTING_PERIOD";
export const PROPOSAL_STATUS = {
  PROPOSAL_STATUS_UNSPECIFIED: "Default",
  PROPOSAL_STATUS_DEPOSIT_PERIOD: "Deposit",
  PROPOSAL_STATUS_VOTING_PERIOD: "Voting",
  PROPOSAL_STATUS_PASSED: "Passed",
  PROPOSAL_STATUS_REJECTED: "Rejected",
  PROPOSAL_STATUS_FAILED: "Failed",
};

export const PROPOSAL_DISPLAY_MAPPING: Record<string, string> = {
  PROPOSAL_STATUS_UNSPECIFIED: "Default",
  PROPOSAL_STATUS_DEPOSIT_PERIOD: "Deposit",
  PROPOSAL_STATUS_VOTING_PERIOD: "Voting",
  PROPOSAL_STATUS_PASSED: "Passed",
  PROPOSAL_STATUS_REJECTED: "Rejected",
  PROPOSAL_STATUS_FAILED: "Failed",
};

export type TallyingProps = {
  quorum: string;
  threshold: string;
  veto_threshold: string;
};

export type ProposalDetailProps = {
  id: string;
  title: string;
  status: string;
  votingStartTime: string;
  votingEndTime: string;
  tallyResults: string[];
  tallyPercents: number[];
  tallying: TallyingProps;
  type: string;
  totalDeposit: string;
  submitTime: string;
  depositEndTime: string;
  description: string;
  total: BigNumber;
  isVotingTimeWithinRange: boolean;
};

export const lookupProposalEndStatus: { [key: string]: string } = {
  0: "Passed",
  2: "Abstain",
  1: "No",
  3: "No With Veto",
};

export const optionVoteSelected: { [key: string]: number } = {
  Yes: 1,
  Abstain: 2,
  No: 3,
  "No with Veto": 4,
};

interface VotingReference {
  [key: string]: string;
}

export const VOTING_LOOKUP: VotingReference = {
  VOTE_OPTION_YES: "Yes",
  VOTE_OPTION_ABSTAIN: "Abstain",
  VOTE_OPTION_NO: "No",
  VOTE_OPTION_NO_WITH_VETO: "No with Veto",
};

type OptionsVoteResponse = {
  option: string;
  weight: string;
};

export type VoteResponse = {
  vote: {
    proposal_id: string;
    voter: string;
    option: string;
    options: OptionsVoteResponse[];
  };
};
