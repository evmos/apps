// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { VOTING_LOOKUP } from "../../../utils/types";

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
  const optionNumber = voteRecord?.vote?.options?.[0]?.option;
  if (optionNumber === undefined) {
    return null;
  }
  const option = VOTING_LOOKUP[optionNumber];
  if (option === undefined) {
    return null;
  }

  return (
    <p className="rounded-3xl bg-pearl px-5 py-2 text-center text-black ">{`You Voted: ${option}`}</p>
  );
};

export default UserVote;
