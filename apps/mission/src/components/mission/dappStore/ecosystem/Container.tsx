// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EcosystemCard } from "./Card";
import { EcosystemProps, ecosystemData } from "./ecosystemData";
import { useTranslation } from "next-i18next";

export const EcosystemContainer = () => {
  const drawEcosystemdApps = (dApps: EcosystemProps[]) => {
    return dApps.map((dApp) => <EcosystemCard data={dApp} key={dApp.name} />);
  };

  const { t } = useTranslation();

  return (
    <section className="space-y-6 pt-11">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="space-y-1">
          <h1 className="text-2xl text-pearl">
            {t("dappStore.ecosystem.title")}
          </h1>
          <h2 className="text-grayOpacity2">
            {t("dappStore.ecosystem.description")}
          </h2>
        </div>
      </div>
      <div className="grid gap-x-8 md:grid-cols-4">
        {drawEcosystemdApps(ecosystemData)}
      </div>
    </section>
  );
};
