// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CopilotCard, StepsContextProvider, steps } from "copilot";

export const Onboard = () => {
  return (
    <StepsContextProvider steps={steps}>
      <CopilotCard />
    </StepsContextProvider>
  );
};
