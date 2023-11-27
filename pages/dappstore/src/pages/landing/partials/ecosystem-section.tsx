// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EcosystemCard } from "./ecosystem-card";
import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import { Subtitle } from "@evmosapps/ui-helpers/src/titles/Subtitle";
import { RightArrow } from "icons";

import { ButtonWithLink } from "@evmosapps/ui-helpers";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";

export const EcosystemSection = async () => {
  const { dApps } = await fetchExplorerData();
  const instantDapps = dApps.filter((dApp) => dApp.instantDapp);
  return (
    <section className="space-y-6 pt-11">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="space-y-1">
          <Title>Instant dApps</Title>
          <Subtitle>
            Earn yields & manage your assets in a few clicks using our instant
            apps
          </Subtitle>
        </div>

        <ButtonWithLink href="/dapps">
          <div className="flex items-center space-x-2">
            <p>See More</p>
            <RightArrow width={11} height={11} />
          </div>
        </ButtonWithLink>
      </div>
      <div className="grid gap-x-8 md:grid-cols-4">
        {instantDapps.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </div>
    </section>
  );
};
