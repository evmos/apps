// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EcosystemSection } from "./partials/ecosystem-section";

import { HeroSection } from "./partials/hero-section";
import { fetchExplorerData } from "../../lib/fetch-explorer-data";
import { ButtonSeedApps } from "./partials/button-see-dapps";
import { LazyCopilotCard } from "./partials/copilot-card/lazy-copilot-card";
import { LazyAccountBalance } from "./LazyAccountBalance";

export const LandingPage = async () => {
  const { dApps } = await fetchExplorerData();

  return (
    <div className="space-y-8 md:space-y-16 text-display ">
      <div className="grid items-center gap-x-8 gap-y-3 md:gap-y-11 md:grid-cols-2">
        <LazyAccountBalance />
        <LazyCopilotCard />
      </div>

      <HeroSection totalApps={dApps.length} />
      <EcosystemSection />
      <ButtonSeedApps totalApps={dApps.length} />
    </div>
  );
};
