// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { Link, Trans } from "@evmosapps/i18n/client";
import { TrackerEvent } from "@evmosapps/ui-helpers";
import { CLICK_ON_VIEW_ALL_DAPPS } from "tracker";
import { translation } from "@evmosapps/i18n/server";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";
import bgImage from "../../../static/apps-bg-2.png";

import { BannerCard } from "./banner-card";

export const HeroSectionExplore = async () => {
  const { t } = await translation("dappStore");
  const { dApps } = await fetchExplorerData();
  const totalApps = dApps.length;
  return (
    <BannerCard>
      <BannerCard.BgImage
        src={bgImage}
        alt="bg"
        objectFit="cover"
        className="scale-150 lg:scale-100 lg:rotate-[7deg] lg:translate-x-[25%] xl:translate-x-[35%] xl:translate-y-[5%]"
        sizes="100vw"
      />
      <BannerCard.Body>
        <Trans
          ns="dappStore"
          shouldUnescape={true}
          i18nKey="ecosystem.explore"
          components={{
            div: (
              <div className="text-heading dark:text-heading-dark text-lg md:text-xl mb-1" />
            ),
          }}
          values={{
            count: totalApps,
          }}
        />
        <p className="dark:text-subheading-dark text-sm mb-6">
          {t("ecosystem.discover")}
        </p>
        <TrackerEvent
          event={CLICK_ON_VIEW_ALL_DAPPS}
          properties={{ Location: "Graphic" }}
        >
          <Button
            className="px-8"
            as={Link}
            href="/dapps"
            variant={"primary"}
            size="md"
            data-testid="open-connect-modal"
          >
            Explore
          </Button>
        </TrackerEvent>
      </BannerCard.Body>
    </BannerCard>
  );
};
