// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BAR_COLORS } from "./styles";

export const BarWrapper = ({ percents }: { percents: string[] }) => {
  return (
    <div className="flex h-4 w-full overflow-hidden rounded-lg bg-darkGray1">
      <div
        className={`${BAR_COLORS.yes}`}
        style={{ width: `${percents[0]}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.no}`}
        style={{ width: `${percents[1]}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.abstain}`}
        style={{ width: `${percents[2]}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.noWithVeto}`}
        style={{ width: `${percents[3]}%` }}
      ></div>
    </div>
  );
};
