import {
  ProposalProps,
  PROPOSAL_STATUS,
  PROPOSAL_STATUS_PASSED,
  PROPOSAL_STATUS_REJECTED,
} from "../../../internal/governance/functionality/types";
import BarContainer from "../../governance/proposals/bar/BarContainer";

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

  return (
    <div className="flex p-6 gap-4 hover:bg-darkGray2Opacity flex-col border-b border-darkGray5">
      <span className="font-medium text-base">{proposalProps?.title}</span>
      <div className="flex items-center gap-3 text-darkGray5">
        <div className="border text-xs px-2 py-0.5 rounded border-darkGray5">
          {getPropStatus()}
        </div>
        <span>Voting ends on {proposalProps.votingEndTime}</span>
      </div>
      <BarContainer percents={proposalProps.tallyResults} />
    </div>
  );
};

export default ProposalCard;
