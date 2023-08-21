// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StepsContextProvider } from "../container/StepsContext";
import { wizardSteps } from "../container/data";
import { TopUpDapp } from "./Topup";

export const TopUpContainer = ({ status }: { status: string }) => {
  return (
    <StepsContextProvider steps={wizardSteps}>
      <TopUpDapp status={status} />
    </StepsContextProvider>
  );
};
