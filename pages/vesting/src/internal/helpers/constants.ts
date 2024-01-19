// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TimeWindow } from "./types";
export const TIME_WINDOWS_TO_DAYJS_PARAMS_MAP: Record<
  TimeWindow,
  [number, "year" | "month" | "day" | "none"]
> = {
  ["4-years"]: [4, "year"],
  ["1-year"]: [1, "year"],
  ["1-month"]: [1, "month"],
  ["1-day"]: [1, "day"],
  ["none"]: [0, "none"],
};
