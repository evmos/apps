// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { STEPS_CIRCLE_STYLES, TEXT_STYLES } from "./helpers";
import { stepsStatusI } from "./types";

export const StepsContainer = ({ step }: { step: stepsStatusI }) => {
  return (
    <li key={step.title}>
      <span className="flex cursor-default items-center">
        {STEPS_CIRCLE_STYLES[step.status]}
        <span
          className={`${TEXT_STYLES[step.status]}  ml-3 text-sm font-medium`}
        >
          {step.title}
        </span>
      </span>
    </li>
  );
};
