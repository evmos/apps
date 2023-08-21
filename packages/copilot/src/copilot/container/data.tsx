// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TopUpContainer } from "../dapp/TopUpContainer";
import { NextStepsActionsDapp } from "../dapp/NextStepsDapp";
import { NextSteps } from "../steps/nextSteps/NextSteps";
import { SetUpAccountContainer } from "../steps/setUpAccount/SetUpAccountContainer";
import { STEP_STATUS } from "../steps/setUpAccount/buttons/utils";
import { TopUp } from "../steps/topUp/TopUp";
import { SetUpContainer } from "../dapp/SteUpContainer";

const TOP_UP_TEXT = "Top up your account";
const NEXT_STEPS_TEXT = "Next steps";

export const steps = [
  {
    title: "Set up your account",
    component: <SetUpAccountContainer />,
    status: STEP_STATUS.CURRENT,
    buttonDapp: (status: string) => <SetUpContainer status={status} />,
    index: 0,
  },
  {
    title: TOP_UP_TEXT,
    component: <TopUp />,
    status: STEP_STATUS.NOT_PROCESSED,
    buttonDapp: (status: string) => <TopUpContainer status={status} />,
    index: 1,
  },
  {
    title: NEXT_STEPS_TEXT,
    component: <NextSteps />,
    status: STEP_STATUS.NOT_PROCESSED,
    buttonDapp: (status: string) => <NextStepsActionsDapp status={status} />,
    index: 2,
  },
];

export const topUpStep = [
  {
    title: TOP_UP_TEXT,
    component: <TopUp />,
    status: STEP_STATUS.CURRENT,
    buttonDapp: (status: string) => <TopUpContainer status={status} />,
  },
];

export const wizardSteps = [
  {
    title: TOP_UP_TEXT,
    component: <TopUp />,
    status: STEP_STATUS.CURRENT,
    buttonDapp: () => <></>,
  },
  {
    title: NEXT_STEPS_TEXT,
    component: <NextSteps />,
    status: STEP_STATUS.NOT_PROCESSED,
    buttonDapp: () => <></>,
  },
];
