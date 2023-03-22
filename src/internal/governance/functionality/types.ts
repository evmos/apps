import { BigNumber } from "ethers";

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
};

export const lookupProposalEndStatus: { [key: string]: string } = {
  0: "Passed",
  2: "Abstain",
  1: "No",
  3: "No With Veto",
};
