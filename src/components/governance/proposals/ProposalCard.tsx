import { ProposalProps } from "../../../internal/governance/functionality/types";
import BarContainer from "./bar/BarContainer";
import ProposalStatus from "./ProposalStatus";

const ProposalCard = ({
  proposalProps,
  onClick,
}: {
  proposalProps: ProposalProps;
  onClick: () => Promise<boolean>;
}) => {
  return (
    <div
      className="bg-darkGray2 hover:bg-darkGray2Opacity transition-all duration-300 rounded-2xl p-5 space-y-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between font-bold text-pearl font-[IBM]">
        <div className="bg-black px-3 py-2 rounded-3xl">
          #{proposalProps.id}
        </div>
        <ProposalStatus status={proposalProps.status} />
      </div>
      <div className="text-pearl font-bold text-lg">{proposalProps.title}</div>
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
