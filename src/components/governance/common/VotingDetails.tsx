import { BAR_COLORS, VOTE_TYPES } from "../bar/styles";
import VotingDetail from "../bar/VotingDetail";

const VotingDetails = ({
  percents,
  values,
}: {
  percents: string[];
  values: string[];
}) => {
  return (
    <div className="grid grid-cols-2 ">
      <VotingDetail
        votingProps={{
          bgColor: BAR_COLORS.yes,
          type: VOTE_TYPES.yes,
          percent: percents[0],
          value: values[0],
        }}
      />
      <VotingDetail
        votingProps={{
          bgColor: BAR_COLORS.no,
          type: VOTE_TYPES.no,
          percent: percents[1],
          value: values[1],
        }}
      />
      <VotingDetail
        votingProps={{
          bgColor: BAR_COLORS.abstain,
          type: VOTE_TYPES.abstain,
          percent: percents[2],
          value: values[2],
        }}
      />
      <VotingDetail
        votingProps={{
          bgColor: BAR_COLORS.noWithVeto,
          type: VOTE_TYPES.noWithVeto,
          percent: percents[3],
          value: values[3],
        }}
      />
    </div>
  );
};

export default VotingDetails;
