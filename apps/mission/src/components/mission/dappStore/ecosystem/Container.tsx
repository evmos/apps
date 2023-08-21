// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { Button } from "../Button";
import { EcosystemCard } from "./Card";
import { EcosystemProps, ecosystemData } from "./ecosystemData";
import { useTranslation } from "next-i18next";
import { ECOSYSTEM_URL, GOOGLE_FORM_URL } from "constants-helper";
import {
  useTracker,
  CLICK_ON_VIEW_ALL_DAPPS,
  CLCIK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM,
} from "tracker";
export const EcosystemContainer = () => {
  const { handlePreClickAction } = useTracker(CLICK_ON_VIEW_ALL_DAPPS);
  const { handlePreClickAction: clickApply } = useTracker(
    CLCIK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM
  );
  const handleViewAlldApps = () => {
    handlePreClickAction();
    window.open(ECOSYSTEM_URL, "_blank");
  };

  const handleGoogleFormClick = () => {
    clickApply();
  };
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
            <Link
              className="ml-2 text-red transition-all duration-200 ease-in-out hover:text-[#f26850] active:text-[#f0735d]"
              href={GOOGLE_FORM_URL}
              rel="noopener noreferrer"
              target="_blank"
              onClick={handleGoogleFormClick}
            >
              {t("dappStore.ecosystem.description2")}
            </Link>
          </h2>
        </div>
        <Button
          text={t("dappStore.ecosystem.button.text")}
          handleOnClick={handleViewAlldApps}
        />
      </div>
      <div className="grid gap-x-8 md:grid-cols-4">
        {drawEcosystemdApps(ecosystemData)}
      </div>
    </section>
  );
};
