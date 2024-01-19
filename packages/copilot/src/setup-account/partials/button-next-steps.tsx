// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

import { Badge, TrackerEvent } from "@evmosapps/ui-helpers";

import { CLICK_ON_VIEW_ALL_DAPPS, COMPLETED_COPILOT_ONBOARDING } from "tracker";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { cn } from "helpers";
import { useModal } from "@evmosapps/ui-helpers/src/Modal";
import { TitleButton } from "../../partials/title-button";

export const ButtonsNextSteps = () => {
  const { t } = useTranslation("copilot-setup-account");
  const { setIsOpen } = useModal();

  return (
    <>
      <div className="grid w-full grid-cols-1 space-y-3 pb-3 pt-5 md:grid-cols-2 md:space-x-4 md:space-y-0">
        <TrackerEvent
          event={CLICK_ON_VIEW_ALL_DAPPS}
          properties={{
            Location: "Inside Copilot",
          }}
        >
          <Button href="/dapps">
            <p className="text-sm font-bold">
              {t("nextsteps.interactWithdApp.title")}
            </p>
            <Badge variant="success">
              {t("nextsteps.interactWithdApp.badge")}
            </Badge>
          </Button>
        </TrackerEvent>
        <TrackerEvent
          event={COMPLETED_COPILOT_ONBOARDING}
          properties={{
            "Completed Copilot Onboarding": "Stake your Evmos",
          }}
        >
          <Button href="/staking">
            <TitleButton text={t("nextsteps.stakeEvmos.title")} />
            <Badge variant="warning">{t("nextsteps.stakeEvmos.badge")}</Badge>
          </Button>
        </TrackerEvent>
      </div>
      <TrackerEvent
        event={COMPLETED_COPILOT_ONBOARDING}
        properties={{
          "Completed Copilot Onboarding": "Learn More",
        }}
      >
        <a
          className="border-gray300 w-full cursor-pointer rounded-lg border py-3 shadow transition-all duration-300 hover:shadow-md"
          href="https://academy.evmos.org/faq"
          target="_blank"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <TitleButton text={t("nextsteps.learnMore.title")} />
        </a>
      </TrackerEvent>
    </>
  );
};

const Button = ({ className, ...rest }: ComponentProps<typeof Link>) => {
  return (
    <Link
      className={cn(
        "border-gray300 flex cursor-pointer flex-col items-center space-y-2 rounded-lg border px-4 py-5 shadow transition-all duration-300 hover:shadow-md",
        className
      )}
      {...rest}
    />
  );
};
