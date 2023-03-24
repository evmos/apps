import { ProposalProps } from "../../../internal/governance/functionality/types";
import BarContainer from "./bar/BarContainer";
import ProposalStatus from "./ProposalStatus";
import IdContainer from "../common/IdContainer";
import TitleContainer from "../common/TitleContainer";

const ProposalCard = ({ proposalProps }: { proposalProps: ProposalProps }) => {
  return (
    <div className="bg-darkGray2 hover:bg-darkGray2Opacity transition-all duration-300 rounded-2xl p-5 space-y-5 cursor-pointer">
      <div className="flex justify-between font-bold text-pearl font-[IBM]">
        <IdContainer id={proposalProps.id} />
        <ProposalStatus status={proposalProps.status} />
      </div>
      <TitleContainer title={proposalProps.title} />
      <div className="flex text-pearl">
        <div className="pr-5 uppercase space-y-1">
          <p className="font-bold opacity-80 text-sm">
            {proposalProps.votingStartTime}
          </p>
          <p className="text-xs">VOTING START</p>
        </div>
        <div className="px-5 uppercase space-y-1 border-l border-darkGray5">
          <p className="font-bold opacity-80 text-sm">
            {proposalProps.votingEndTime}
          </p>
          <p className="text-xs">VOTING END</p>
        </div>
      </div>
      <BarContainer percents={proposalProps.tallyResults} />
    </div>
  );
};

export default ProposalCard;
