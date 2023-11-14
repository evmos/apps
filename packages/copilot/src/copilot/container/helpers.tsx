// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { STEP_STATUS } from "constants-helper";
import { IconContainer } from "@evmosapps/ui-helpers";
import { ICONS_TYPES } from "constants-helper";

export const TEXT_STYLES = {
  [STEP_STATUS.CURRENT]: "text-red",
  [STEP_STATUS.NOT_PROCESSED]: "text-lightGrey",
  [STEP_STATUS.DONE]: "text-lightGrey",
};

export const STEPS_CIRCLE_STYLES = {
  [STEP_STATUS.DONE]: <IconContainer type={ICONS_TYPES.CHECK} />,
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

export const TEXT_STYLES_DAPP = {
  [STEP_STATUS.CURRENT]: "text-pearl",
  [STEP_STATUS.NOT_PROCESSED]: "text-pearl opacity-70",
  [STEP_STATUS.DONE]: "text-pearl opacity-70",
};

export const STEPS_CIRCLE_STYLES_DAPP = {
  [STEP_STATUS.DONE]: (
    <span
      className="flex h-4 w-4 items-center justify-center"
      aria-hidden="true"
    >
      <span className="absolute h-3 w-3 rounded-full bg-white" />
      <span className="relative block h-2 w-2 rounded-full bg-white" />
    </span>
  ),
  [STEP_STATUS.CURRENT]: (
    <span
      className="flex h-4 w-4 items-center justify-center"
      aria-hidden="true"
    >
      <span className="absolute h-3 w-3 rounded-full bg-white opacity-30" />
      <span className="relative block h-2 w-2 rounded-full bg-white" />
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
