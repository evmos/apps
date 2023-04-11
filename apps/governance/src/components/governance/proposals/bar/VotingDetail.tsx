import { VotingDetail } from "./types";

const VotingDetail = ({ votingProps }: { votingProps: VotingDetail }) => {
  return (
    <div className="flex items-center space-x-2 font-[IBM] text-sm">
      <div className={`${votingProps.bgColor} h-4 w-4 rounded-lg`}></div>
      <div className="font-bold text-pearl opacity-80">
        <p>{votingProps.type}</p>
        <p>{Number(votingProps.percent).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default VotingDetail;
