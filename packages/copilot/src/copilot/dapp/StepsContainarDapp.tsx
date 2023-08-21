// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  TEXT_STYLES_DAPP,
  STEPS_CIRCLE_STYLES_DAPP,
} from "../container/helpers";
import { stepsStatusI } from "../container/types";

export const StepsContainerDapp = ({ step }: { step: stepsStatusI }) => {
  return (
    <li key={step.title}>
      <span className="flex cursor-default items-center">
        {STEPS_CIRCLE_STYLES_DAPP[step.status]}
        <span className={`${TEXT_STYLES_DAPP[step.status]}  ml-3 font-medium`}>
          {step.title}
        </span>
      </span>
    </li>
  );
};
