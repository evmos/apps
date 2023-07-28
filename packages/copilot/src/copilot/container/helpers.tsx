// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { STEP_STATUS } from "../steps/setUpAccount/buttons/utils";
import { CheckIcon } from "icons";

export const TEXT_STYLES = {
  [STEP_STATUS.CURRENT]: "text-red",
  [STEP_STATUS.NOT_PROCESSED]: "text-lightGrey",
  [STEP_STATUS.DONE]: "text-lightGrey",
};

export const STEPS_CIRCLE_STYLES = {
  [STEP_STATUS.DONE]: (
    <div className="bg-red text-pearl flex h-4 w-4 items-center justify-center rounded-full">
      <CheckIcon width={"14px"} height={"14px"} color="#fff" />
    </div>
  ),
  [STEP_STATUS.CURRENT]: (
    <span
      className="flex h-4 w-4 items-center justify-center"
      aria-hidden="true"
    >
      <span className="bg-pink absolute h-4 w-4 rounded-full" />
      <span className="bg-red relative block h-2 w-2 rounded-full" />
    </span>
  ),
  [STEP_STATUS.NOT_PROCESSED]: (
    <div
      className="relative flex h-4 w-4 items-center justify-center"
      aria-hidden="true"
    >
      <div className="bg-strokeGrey h-2 w-2 rounded-full" />
    </div>
  ),
};

export interface stepsStatusI {
  status: string;
  index: number;
  component: JSX.Element;
  title: string;
}
