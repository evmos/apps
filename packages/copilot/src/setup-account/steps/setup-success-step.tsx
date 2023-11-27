import { useTranslation } from "@evmosapps/i18n/client";
import { IconContainer, Modal, PrimaryButton } from "@evmosapps/ui-helpers";

import ConfettiExplosion from "react-confetti-explosion";
import { CLICK_ON_TOP_UP_YOUR_ACCOUNT_COPILOT, sendEvent } from "tracker";
import { useCopilot } from "../../copilot";

export const SetupAccountSuccesStep = () => {
  const { t } = useTranslation("copilot-setup-account");
  const { nextStep } = useCopilot();
  return (
    <section className=" h-full w-full space-y-1 overflow-hidden text-center flex flex-col items-center">
      <Modal.Header />
      <div className="flex items-center justify-center ">
        <IconContainer type="BIG_CONFETTI" />
      </div>
      <h6 className="font-bold">{t("connectSuccessStep.title")}</h6>
      <p className="pb-5 text-sm">{t("connectSuccessStep.body")}</p>

      <PrimaryButton
        onClick={() => {
          sendEvent(CLICK_ON_TOP_UP_YOUR_ACCOUNT_COPILOT);
          nextStep();
        }}
      >
        {t("connectSuccessStep.action") as string}
      </PrimaryButton>

      <ConfettiExplosion
        zIndex={10000}
        duration={7000}
        particleCount={250}
        height={3000}
        width={3000}
      />
    </section>
  );
};
