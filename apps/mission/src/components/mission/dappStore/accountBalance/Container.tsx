// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StepsContextProvider, topUpStep } from "copilot";
import { AccountBalance } from "./AccountBalance";
export const AccountBalanceContainer = () => {
  return (
    <StepsContextProvider steps={topUpStep}>
      <AccountBalance />
    </StepsContextProvider>
  );
};
