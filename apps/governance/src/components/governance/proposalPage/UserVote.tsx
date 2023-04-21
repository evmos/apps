// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

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
    <p className="rounded-3xl bg-pearl px-5 py-2 text-center text-black ">{`You Voted: ${
      VOTING_LOOKUP[voteRecord?.vote?.options[0].option]
    }`}</p>
  ) : null;
};

export default UserVote;
