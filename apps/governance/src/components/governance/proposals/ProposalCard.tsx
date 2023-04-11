import { ProposalProps } from "../../../internal/governance/functionality/types";
import BarContainer from "./bar/BarContainer";
import ProposalStatus from "./ProposalStatus";
import IdContainer from "../common/IdContainer";
import TitleContainer from "../common/TitleContainer";

const ProposalCard = ({ proposalProps }: { proposalProps: ProposalProps }) => {
  return (
    <div className="cursor-pointer space-y-5 rounded-2xl bg-darkGray2 p-5 transition-all duration-300 hover:bg-darkGray2Opacity">
      <div className="flex justify-between font-[IBM] font-bold text-pearl">
        <IdContainer id={proposalProps.id} />
        <ProposalStatus status={proposalProps.status} />
      </div>
      <TitleContainer title={proposalProps.title} />
      <div className="flex text-pearl">
        <div className="space-y-1 pr-5 uppercase">
          <p className="text-sm font-bold opacity-80">
            {proposalProps.votingStartTime}
          </p>
          <p className="text-xs">VOTING START</p>
        </div>
        <div className="space-y-1 border-l border-darkGray5 px-5 uppercase">
          <p className="text-sm font-bold opacity-80">
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
