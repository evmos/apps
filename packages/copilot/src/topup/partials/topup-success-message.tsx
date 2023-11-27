import { useTranslation } from "@evmosapps/i18n/client";
import {
  IconContainer,
  PrimaryButton,
  TrackerEvent,
} from "@evmosapps/ui-helpers";

import {
  CLICK_ON_CONTINUE_TO_THE_DASHBOARD,
  CLICK_ON_NEXT_STEPS_COPILOT,
} from "tracker";
import { ICONS_TYPES } from "constants-helper";
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
            <TrackerEvent event={CLICK_ON_CONTINUE_TO_THE_DASHBOARD}>
              <PrimaryButton
                onClick={() => {
                  setIsOpen(false);
                }}
                className="ml-0 mt-3"
              >
                {t("successTopupStep.actions.goToDashboard") as string}
              </PrimaryButton>
            </TrackerEvent>
          )}
          {flowId === "setup-account" && (
            <TrackerEvent event={CLICK_ON_NEXT_STEPS_COPILOT}>
              <PrimaryButton
                onClick={() => {
                  setActiveStep("next-steps");
                }}
                className="ml-0 mt-3"
              >
                {t("successTopupStep.actions.nextSteps") as string}
              </PrimaryButton>
            </TrackerEvent>
          )}
        </div>
      </div>
    </div>
  );
};
