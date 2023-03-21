import { formatAttoNumber } from "../../../internal/asset/style/format";
import { VotingDetail } from "./types";

const VotingDetail = ({ votingProps }: { votingProps: VotingDetail }) => {
  return (
    <div className="flex items-center space-x-2 font-[IBM] text-sm">
      <div
        className={`${votingProps.bgColor} w-4 h-4 rounded-[50%] flex-shrink-0`}
      ></div>
      <div className="text-pearl opacity-80 font-bold">
        <p>{votingProps.type}</p>
        <span>{Number(votingProps.percent).toFixed(2)}% </span>
        {votingProps.value !== undefined && (
          <span>({formatAttoNumber(votingProps.value)})</span>
        )}
      </div>
    </div>
  );
};

export default VotingDetail;
