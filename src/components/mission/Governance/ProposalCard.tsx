import {
  ProposalProps,
  PROPOSAL_STATUS,
  PROPOSAL_STATUS_PASSED,
  PROPOSAL_STATUS_REJECTED,
} from "../../../internal/governance/functionality/types";

const ProposalCard = ({ proposalProps }: { proposalProps: ProposalProps }) => {
  function getPropStatus(): string {
    const status = proposalProps.status;
    if (status === PROPOSAL_STATUS_REJECTED) {
      return PROPOSAL_STATUS.PROPOSAL_STATUS_REJECTED;
    }
    if (status === PROPOSAL_STATUS_PASSED) {
      return PROPOSAL_STATUS.PROPOSAL_STATUS_PASSED;
    }
    return PROPOSAL_STATUS.PROPOSAL_STATUS_VOTING_PERIOD;
  }

  function formatTally(r: string | undefined) {
    return parseFloat(r ?? "").toFixed(2);
  }

  return (
    <div className="flex p-6 gap-4 hover:bg-darkGray2Opacity flex-col border-b border-darkGray5">
      <span className="font-medium text-base">{proposalProps?.title}</span>
      <div className="flex items-center gap-3 text-darkGray5">
        <div className="border text-xs px-2 py-0.5 rounded border-darkGray5">
          {getPropStatus()}
        </div>
        <span>Voting ends on {proposalProps.votingEndTime}</span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="rounded-full h-4 w-4 bg-green" />
          <div className="flex flex-col">
            <span>Yes</span>
            <span>{formatTally(proposalProps.tallyResults[0])}%</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="rounded-full h-4 w-4 bg-red" />
          <div className="flex flex-col">
            <span>No</span>
            <span>{formatTally(proposalProps.tallyResults[1])}%</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="rounded-full h-4 w-4 bg-darkGray5" />
          <div className="flex flex-col">
            <span>Abstain</span>
            <span>{formatTally(proposalProps.tallyResults[2])}%</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="rounded-full h-4 w-4 bg-yellow" />
          <div className="flex flex-col">
            <span>No With Veto</span>
            <span>{formatTally(proposalProps.tallyResults[3])}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
