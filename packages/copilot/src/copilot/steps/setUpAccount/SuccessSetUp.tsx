// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import ConfettiExplosion from "react-confetti-explosion";
import { useContext } from "react";
import { StepsContext } from "../../container/StepsContext";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
import { CLICK_ON_TOP_UP_YOUR_ACCOUNT_COPILOT, useTracker } from "tracker";
import { PrimaryButton } from "../../PrimaryButton";
import { IconContainer } from "ui-helpers";

export const SuccessSetUp = () => {
  const { updateStepsStatus } = useContext(StepsContext);
  const { handlePreClickAction } = useTracker(
    CLICK_ON_TOP_UP_YOUR_ACCOUNT_COPILOT
  );

  const handleClick = () => {
    updateStepsStatus();
    handlePreClickAction();
  };

  return (
    <TranslationContextProvider locale="en">
      <section className=" h-full w-full space-y-1 overflow-hidden text-center">
        <div className="flex items-center justify-center ">
          <IconContainer type="BIG_CONFETTI" />
        </div>
        <h6 className="font-bold">{t("setupaccount.success")}</h6>
        <p className="pb-5 text-sm">{t("setupaccount.success.message")}</p>

        <PrimaryButton onClick={handleClick}>
          {t("setupaccount.button.text") as string}
        </PrimaryButton>

        <ConfettiExplosion
          zIndex={11}
          duration={7000}
          particleCount={250}
          height={3000}
          width={3000}
        />
      </section>
    </TranslationContextProvider>
  );
};
