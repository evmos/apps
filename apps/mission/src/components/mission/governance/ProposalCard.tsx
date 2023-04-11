import {
  PROPOSAL_STATUS,
  PROPOSAL_STATUS_PASSED,
  PROPOSAL_STATUS_REJECTED,
  ProposalProps,
} from "../../../internal/types";
import BarContainer from "../../common/bar/BarContainer";

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
    <div className="flex flex-col gap-4 border-b border-darkGray5 p-6 hover:bg-darkGray2Opacity">
      <span className="font-[GreyCliff] text-xl font-bold">
        {proposalProps?.title}
      </span>
      <div className="flex items-center gap-3 text-darkGray5">
        <div className="rounded border border-darkGray5 px-2 py-0.5 text-xs uppercase">
          {getPropStatus()}
        </div>
        <span>Voting ends on {proposalProps.votingEndTime}</span>
      </div>
      <BarContainer percents={proposalProps.tallyResults} />
    </div>
  );
};

export default ProposalCard;
