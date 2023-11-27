// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StakingCard } from "./partials/staking-card";
import { AssetsCard } from "./partials/assets-card";
import { GovernanceCard } from "./partials/governance-card";
import { EcosystemSection } from "./partials/ecosystem-section";
import { AccountBalance } from "./partials/account-balance";

import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import { Subtitle } from "@evmosapps/ui-helpers/src/titles/Subtitle";
import { HeroSection } from "./partials/hero-section";
import { ButtonWithLink, Frameline } from "@evmosapps/ui-helpers";
import { fetchExplorerData } from "../../lib/fetch-explorer-data";
import { Suspense } from "react";
import { CopilotCard } from "./partials/copilot-card/copilot-card";

export const LandingPage = async () => {
  const { dApps } = await fetchExplorerData();

  return (
    <div className="space-y-8 text-display">
      <div className="grid items-center gap-x-8 gap-y-11 md:grid-cols-2">
        <Suspense>
          <AccountBalance />
        </Suspense>
        <CopilotCard />
      </div>
      {/* TODO: add localization */}
      <div className="flex space-y-2 flex-col">
        <Title>Evmos dApps</Title>
        <Subtitle>The core dApps created by the Evmos Team</Subtitle>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <StakingCard />
        <div className="grid grid-rows-2 gap-y-8">
          <AssetsCard />
          <GovernanceCard />
        </div>
      </div>

      <HeroSection />
      <EcosystemSection />
      <Frameline>
        <ButtonWithLink className="w-full " href="/dapps">
          See all {dApps.length} dApps
        </ButtonWithLink>
      </Frameline>
    </div>
  );
};
