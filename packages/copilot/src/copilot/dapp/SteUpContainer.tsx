// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StepsContextProvider } from "../container/StepsContext";
import { setupSteps } from "../container/data";
import { SetUpDapp } from "./SetUp";

export const SetUpContainer = ({ status }: { status: string }) => {
  return (
    <StepsContextProvider steps={setupSteps}>
      <SetUpDapp status={status} />
    </StepsContextProvider>
  );
};
