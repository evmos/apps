// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { MessageMsgCreateClawbackVestingAccount } from "@evmos/transactions";
import dayjs from "dayjs";
import { BigNumber } from "@ethersproject/bignumber";
import { convertToAtto } from "helpers";
import { applyCliff } from "./apply-cliff";
import { TIME_WINDOWS_TO_DAYJS_PARAMS_MAP } from "./constants";
import { generatePeriods } from "./generate-periods";
import { TimeWindow, VestingSchedule } from "./types";

export const generateVestingSchedule = (
  startDate: dayjs.Dayjs,
  fullAmount: string | BigNumber,
  coinDenom: string,
  {
    fullVestingPeriod,
    vestingInterval,
    vestingCliff,
    lockingPeriod,
  }: VestingSchedule,
): Pick<
  MessageMsgCreateClawbackVestingAccount,
  "startTime" | "vestingPeriods" | "lockupPeriods"
> => {
  const start = dayjs(startDate);
  const fullAmountAtto = convertToAtto(fullAmount);
  const endDate = start.add(
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[fullVestingPeriod],
  );
  let vestingPeriods = generatePeriods(
    start,
    endDate,
    vestingInterval,
    fullAmountAtto,
    coinDenom,
  );
  if (vestingCliff !== TimeWindow["none"]) {
    vestingPeriods = applyCliff(
      start
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        .add(...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[vestingCliff])
        .diff(start, "second"),
      vestingPeriods,
    );
  }
  return {
    startTime: start.unix(),
    vestingPeriods: vestingPeriods,
    lockupPeriods:
      lockingPeriod === TimeWindow["none"]
        ? []
        : [
            {
              amount: [
                {
                  amount: fullAmountAtto.toString(),
                  denom: coinDenom,
                },
              ],
              length: start
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                .add(...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[lockingPeriod])
                .diff(start, "seconds"),
            },
          ],
  };
};
