// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Period } from "@evmos/transactions";
import dayjs from "dayjs";
import { BigNumber } from "@ethersproject/bignumber";
import { distributeCoinsEvenly } from "./distribute-coins-evenly";
import { Intervals } from "./types";

export const generatePeriods = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  interval: Intervals,
  fullAmount: BigNumber,
  denom: string
): Period[] => {
  let periods: number[] = [];

  const subtractUnit = interval === Intervals["quarter"] ? 3 : 1;
  const _interval = "month";

  for (
    let date = endDate;
    date.isAfter(startDate);
    date = date.subtract(subtractUnit, _interval)
  ) {
    periods = [date.diff(startDate, "seconds"), ...periods];
  }
  periods = periods.map((finalDate, i) =>
    i === 0 ? finalDate : finalDate - periods[i - 1]!
  );
  const divisions = distributeCoinsEvenly(
    BigNumber.from(fullAmount),
    periods.length
  );
  return periods.map((period, i) => ({
    amount: [
      {
        amount: divisions[i]!.toString(),
        denom,
      },
    ],
    length: period,
  }));
};
