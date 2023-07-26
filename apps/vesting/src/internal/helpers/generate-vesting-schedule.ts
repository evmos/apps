import { MessageMsgCreateClawbackVestingAccount } from "@evmos/transactions";
import dayjs from "dayjs";
import { BigNumber } from "ethers";
import { convertToAtto } from "helpers";
import { applyCliff } from "./apply-cliff";
import { TIME_WINDOWS_TO_DAYJS_PARAMS_MAP } from "./constants";
import { generatePeriods } from "./generate-periods";
import { VestingSchedule } from "./types";

export const generateVestingSchedule = (
  startDate: dayjs.Dayjs,
  fullAmount: string | BigNumber,
  coinDenom: string,
  {
    fullVestingPeriod,
    vestingInterval,
    vestingCliff,
    lockingPeriod,
  }: VestingSchedule
): Pick<
  MessageMsgCreateClawbackVestingAccount,
  "startTime" | "vestingPeriods" | "lockupPeriods"
> => {
  const start = dayjs(startDate);
  const fullAmountAtto = convertToAtto(fullAmount);
  const endDate = start.add(
    //@ts-ignore
    ...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[fullVestingPeriod]
  );
  let vestingPeriods = generatePeriods(
    start,
    endDate,
    vestingInterval,
    fullAmountAtto,
    coinDenom
  );
  if (vestingCliff !== "none") {
    vestingPeriods = applyCliff(
      start
        //@ts-ignore
        .add(...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[vestingCliff])
        .diff(start, "second"),
      vestingPeriods
    );
  }
  return {
    startTime: start.unix(),
    vestingPeriods: vestingPeriods,
    lockupPeriods:
      lockingPeriod === "none"
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
                //@ts-ignore
                .add(...TIME_WINDOWS_TO_DAYJS_PARAMS_MAP[lockingPeriod])
                .diff(start, "seconds"),
            },
          ],
  };
};
