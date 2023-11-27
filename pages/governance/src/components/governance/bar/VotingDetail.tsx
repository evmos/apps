// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { formatAttoNumber } from "helpers";
import { VotingDetail } from "./types";

const VotingDetail = ({ votingProps }: { votingProps: VotingDetail }) => {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <div
        className={`${votingProps.bgColor} h-4 w-4 flex-shrink-0 rounded-[50%]`}
      ></div>
      <div className="font-bold text-pearl opacity-80">
        <p>{votingProps.type}</p>
        <span>{Number(votingProps.percent).toFixed(3)}% </span>
        {votingProps.value !== undefined && (
          <span>({formatAttoNumber(votingProps.value)})</span>
        )}
      </div>
    </div>
  );
};

export default VotingDetail;
