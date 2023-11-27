// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BarWrapper } from "./BarWrapper";
import { BAR_COLORS, VOTE_TYPES } from "./styles";
import { VotingDetail } from "./VotingDetail";

export const BarContainer = ({ percents }: { percents: string[] }) => {
  return (
    <div className="flex flex-col space-y-3">
      <BarWrapper percents={percents} />
      <div className="flex justify-between">
        <VotingDetail
          votingProps={{
            bgColor: BAR_COLORS.yes,
            type: VOTE_TYPES.yes,
            percent: percents[0] ?? "0",
          }}
        />
        <VotingDetail
          votingProps={{
            bgColor: BAR_COLORS.no,
            type: VOTE_TYPES.no,
            percent: percents[1] ?? "0",
          }}
        />
        <VotingDetail
          votingProps={{
            bgColor: BAR_COLORS.abstain,
            type: VOTE_TYPES.abstain,
            percent: percents[2] ?? "0",
          }}
        />
        <VotingDetail
          votingProps={{
            bgColor: BAR_COLORS.noWithVeto,
            type: VOTE_TYPES.noWithVeto,
            percent: percents[3] ?? "0",
          }}
        />
      </div>
    </div>
  );
};
