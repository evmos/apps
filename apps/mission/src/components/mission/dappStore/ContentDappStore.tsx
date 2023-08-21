// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StakingCard } from "./staking/Card";
import { AssetsCard } from "./assets/Card";
import { GovernanceCard } from "./governance/Card";
import { EcosystemContainer } from "./ecosystem/Container";
import { AccountBalanceContainer } from "./accountBalance/Container";
import { Onboard } from "./onboard/Onboard";
export const ContentDappStore = () => {
  return (
    <div className="space-y-8 px-5 text-[IBM]">
      <div className="grid items-center gap-x-8 gap-y-11 md:grid-cols-2">
        <AccountBalanceContainer />
        <Onboard />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <StakingCard />
        <div className="grid grid-rows-2 gap-y-8">
          <AssetsCard /> <GovernanceCard />
        </div>
      </div>
      <EcosystemContainer />
    </div>
  );
};
