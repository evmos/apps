// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { Link, Trans } from "@evmosapps/i18n/client";
import { TrackerEvent } from "@evmosapps/ui-helpers";
import { CLICK_ON_VIEW_ALL_DAPPS } from "tracker";
import { translation } from "@evmosapps/i18n/server";
import { cn } from "helpers";
import { Button } from "../../../../../../packages/ui/src/button";

export const HeroSectionExplore = async ({
  totalApps,
}: {
  totalApps: number;
}) => {
  const { t } = await translation("dappStore");

  return (
    <div className="flex relative py-28 rounded-xl border border-surface-container-low-dark h-full flex-col justify-center overflow-hidden">
      <div
        className={cn(
          "absolute py-[250px] -z-5 h-full w-full bg-gradient-to-r from-surface-container-low-dark via-surface-container-low-dark via-30% to-transparent",
        )}
      />
      <div
        className={cn(
          "absolute py-[220px] -z-10 h-full w-full bg-[url(/apps-bg-2.png)] bg-no-repeat translate-x-[25%] translate-y-[0%] bg-cover md:bg-contain",
          "rotate-[7deg]",
        )}
      />
      <div className="z-10 ml-12">
        <Trans
          ns="dappStore"
          shouldUnescape={true}
          i18nKey="ecosystem.explore"
          components={{
            div: (
              <div className="text-heading dark:text-heading-dark text-xl mb-1" />
            ),
          }}
          values={{
            count: totalApps,
          }}
        />
        <p className="text-subheading dark:text-subheading-dark text-sm mb-6">
          {t("ecosystem.discover")}
        </p>
        <TrackerEvent
          event={CLICK_ON_VIEW_ALL_DAPPS}
          properties={{ Location: "Graphic" }}
        >
          <Link href="/dapps">
            <Button
              variant={"primary"}
              size="md"
              data-testid="open-connect-modal"
            >
              Explore
            </Button>
          </Link>
        </TrackerEvent>
      </div>
    </div>
  );
};
