import { VOTING_LOOKUP } from "../../../internal/governance/functionality/types";

type OptionsVotes = {
  option: string;
  weight: string;
};

type Vote = {
  vote: {
    proposal_id: string;
    voter: string;
    option: string;
    options: OptionsVotes[];
  };
};

const UserVote = ({ voteRecord }: { voteRecord: Vote | undefined }) => {
  return voteRecord !== undefined &&
    voteRecord?.vote?.options &&
    voteRecord?.vote?.options.length > 0 ? (
    <p className="px-5 py-2 rounded-3xl text-black bg-pearl text-center ">{`You Voted: ${
      VOTING_LOOKUP[voteRecord?.vote?.options[0].option]
    }`}</p>
  ) : null;
};

export default UserVote;
