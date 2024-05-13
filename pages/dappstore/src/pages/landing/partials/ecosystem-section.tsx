// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EcosystemCard } from "./ecosystem-card";
import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import { Subtitle } from "@evmosapps/ui-helpers/src/titles/Subtitle";
import { RightArrow } from "@evmosapps/icons/RightArrow";
import { translation } from "@evmosapps/i18n/server";
import { ButtonWithLink } from "@evmosapps/ui-helpers";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";
import { EcosystemCardGrid } from "./ecosystem-card-grid";

export const EcosystemSection = async () => {
  const { t } = await translation("dappStore");
  const { dApps } = await fetchExplorerData();

  // if we want that some specific dApps don't appear in the instant dApps section
  const blacklist = ["transak"];

  const instantDapps = dApps
    // get the instant dapps
    .filter((dApp) => dApp.instantDapp)
    // remove items from the blacklist
    .filter((dApp) => !blacklist.includes(dApp.slug))
    .slice(0, 8);

  return (
    <section className="space-y-8">
      <div className="space-y-3 md:space-y-0">
        <div className="flex flex-row justify-between w-full items-center md:items-start ">
          <Title>{t("ecosystem.instantdApps.title")}</Title>

          <ButtonWithLink href="/dapps/instant-dapps" className="self-center">
            <div className="flex items-center space-x-2">
              <p>{t("ecosystem.instantdApps.button.text")}</p>
              <RightArrow width={11} height={11} />
            </div>
          </ButtonWithLink>
        </div>
        <Subtitle>{t("ecosystem.instantdApps.description")}</Subtitle>
      </div>
      <EcosystemCardGrid>
        {instantDapps.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </EcosystemCardGrid>
    </section>
  );
};
