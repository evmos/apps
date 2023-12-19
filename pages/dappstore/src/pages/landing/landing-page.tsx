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
import { fetchExplorerData } from "../../lib/fetch-explorer-data";

import { CopilotCard } from "./partials/copilot-card/copilot-card";
import { translation } from "@evmosapps/i18n/server";
import { CLICK_ON_VIEW_ALL_DAPPS } from "tracker";
import { Frameline } from "@evmosapps/ui-helpers/src/container/FrameLine";
import { TrackerEvent } from "@evmosapps/ui-helpers/src/TrackerEvent";
import { ButtonWithLink } from "@evmosapps/ui-helpers/src/links/Button";

export const LandingPage = async () => {
  const { dApps } = await fetchExplorerData();
  const { t } = await translation("dappStore");
  return (
    <div className="space-y-8 md:space-y-16 text-display ">
      <div className="grid items-center gap-x-8 gap-y-3 md:gap-y-11 md:grid-cols-2">
        <AccountBalance />
        <CopilotCard />
      </div>
      <div className="flex space-y-2 flex-col">
        <Title>{t("card.title")}</Title>
        <Subtitle>{t("card.description")}</Subtitle>
        <div className="grid gap-8 md:grid-cols-2 pt-5">
          <StakingCard />
          <div className="grid grid-rows-2 gap-y-8">
            <AssetsCard />
            <GovernanceCard />
          </div>
        </div>
      </div>

      <HeroSection totalApps={dApps.length} />
      <EcosystemSection />
      <Frameline>
        <TrackerEvent
          event={CLICK_ON_VIEW_ALL_DAPPS}
          properties={{ Location: "Home Page" }}
        >
          <ButtonWithLink className="w-full " href="/dapps">
            {t("ecosystem.button.text")} {dApps.length}{" "}
            {t("ecosystem.button.text2")}
          </ButtonWithLink>
        </TrackerEvent>
      </Frameline>
    </div>
  );
};
