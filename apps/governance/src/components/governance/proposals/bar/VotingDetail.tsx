import { VotingDetail } from "./types";

const VotingDetail = ({ votingProps }: { votingProps: VotingDetail }) => {
  return (
    <div className="flex items-center space-x-2 font-[IBM] text-sm">
      <div className={`${votingProps.bgColor} w-4 h-4 rounded-lg`}></div>
      <div className="text-pearl opacity-80 font-bold">
        <p>{votingProps.type}</p>
        <p>{Number(votingProps.percent).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default VotingDetail;
