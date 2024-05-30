// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "@evmosapps/i18n/client";
import {
  IconContainer,
  PrimaryButton,
  TrackerEvent,
} from "@evmosapps/ui-helpers";

import { CLICK_ON_NEXT_STEPS_COPILOT } from "tracker";
import { ICONS_TYPES } from "@evmosapps/constants";
import { useModal } from "@evmosapps/ui-helpers/src/Modal";
import { useCopilot } from "../../copilot";

export const TopupSuccessMessage = () => {
  const { t } = useTranslation("copilot-topup");
  const { flowId, setActiveStep } = useCopilot();
  const { setIsOpen } = useModal();

  return (
    <div className="bg-lightYellow2 space-y-4 rounded-lg p-4">
      <div className=" flex items-start space-x-3">
        <IconContainer type={ICONS_TYPES.CONFETTI} />
        <div className="text-[#196235]">
          <h3 className="font-bold">{t("successTopupStep.title")}</h3>
          <p className="text-sm">{t("successTopupStep.description")}</p>
          {flowId === "topup" && (
            <PrimaryButton
              onClick={() => {
                setIsOpen(false);
              }}
              className="ml-0 mt-3"
            >
              {t("successTopupStep.actions.goToDashboard")}
            </PrimaryButton>
          )}
          {flowId === "setup-account" && (
            <TrackerEvent event={CLICK_ON_NEXT_STEPS_COPILOT}>
              <PrimaryButton
                onClick={() => {
                  setActiveStep("next-steps");
                }}
                className="ml-0 mt-3"
              >
                {t("successTopupStep.actions.nextSteps")}
              </PrimaryButton>
            </TrackerEvent>
          )}
        </div>
      </div>
    </div>
  );
};
