// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { Link, Trans } from "@evmosapps/i18n/client";
import { TrackerEvent } from "@evmosapps/ui-helpers";
import { CLICK_ON_VIEW_ALL_DAPPS } from "tracker";
import { translation } from "@evmosapps/i18n/server";
import { cn } from "helpers";
import { Button } from "@evmosapps/ui/button/index.tsx";

export const HeroSectionExplore = async ({
  totalApps,
}: {
  totalApps: number;
}) => {
  const { t } = await translation("dappStore");

  return (
    <div className="flex relative h-[368px] rounded-xl border border-surface-container-low-dark flex-col justify-end lg:justify-center overflow-hidden">
      <div
        className={cn(
          "absolute py-[250px] z-10 h-full w-full",
          "bg-gradient-to-t from-surface-container-low-dark via-surface-container-low-dark via-35% to-transparent",
          "lg:bg-gradient-to-r lg:from-surface-container-low-dark lg:via-surface-container-low-dark lg:via-30% lg:to-transparent",
        )}
      />
      <div
        className={cn(
          "absolute py-[250px] z-0 h-full w-full bg-[url(/apps-bg-2.png)] bg-no-repeat lg:bg-[length:1200px] bg-[length:800px] ",
          "lg:rotate-[7deg] lg:translate-x-[25%] xl:translate-x-[35%] xl:translate-y-[5%]",
        )}
      />
      <div className="z-10 ml-8 md:ml-12 mb-5">
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
        <p className="text-subheading dark:text-subheading-dark text-sm mb-6">
          {t("ecosystem.discover")}
        </p>
        <TrackerEvent
          event={CLICK_ON_VIEW_ALL_DAPPS}
          properties={{ Location: "Graphic" }}
        >
          <Link href="/dapps">
            {/* btn full-screen */}
            <Button
              variant={"primary"}
              size="md"
              data-testid="open-connect-modal"
              className="hidden md:block"
            >
              Explore
            </Button>
            {/* btn mobile */}
            <Button
              variant={"primary"}
              size="sm"
              data-testid="open-connect-modal"
              className="block md:hidden"
            >
              Explore
            </Button>
          </Link>
        </TrackerEvent>
      </div>
    </div>
  );
};
