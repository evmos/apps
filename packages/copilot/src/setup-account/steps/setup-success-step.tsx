// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "@evmosapps/i18n/client";
import { IconContainer, Modal, PrimaryButton } from "@evmosapps/ui-helpers";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useCopilot } from "../../copilot";
import { CLICK_ON_TOP_UP_ACCOUNT_DAPP, sendEvent } from "tracker";
import { createPortal } from "react-dom";

export const SetupAccountSuccesStep = () => {
  const { width, height } = useWindowSize();
  const { t } = useTranslation("copilot-setup-account");
  const { nextStep } = useCopilot();

  return (
    <section className="h-full w-full space-y-1 overflow-hidden text-center flex flex-col z-[1]">
      <Modal.Header />
      {createPortal(
        <Confetti
          style={{ zIndex: 99999 }}
          width={width}
          className="pointer-events-none"
          height={height}
          numberOfPieces={3000}
          recycle={false}
          confettiSource={{
            x: width / 6,
            y: height / 6,
            w: 3000,
            h: 3000,
          }}
        />,
        document.body
      )}
      <div className="flex items-center justify-center ">
        <IconContainer type="BIG_CONFETTI" />
      </div>
      <h6 className="font-bold text-base">{t("connectSuccessStep.title")}</h6>
      <p className="pb-5 text-sm">{t("connectSuccessStep.body")}</p>

      <PrimaryButton
        className="self-center"
        onClick={() => {
          sendEvent(CLICK_ON_TOP_UP_ACCOUNT_DAPP, {
            Location: "Inside Copilot",
          });
          nextStep();
        }}
      >
        {t("connectSuccessStep.action")}
      </PrimaryButton>
    </section>
  );
};
