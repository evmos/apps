// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "@evmosapps/i18n/client";
import { IconContainer, Modal } from "@evmosapps/ui-helpers";
import { useFireworks } from "../../partials/use-fireworks";
import { useEffect } from "react";
import { ICONS_TYPES } from "constants-helper";
import { ButtonsNextSteps } from "../partials/button-next-steps";
import Fireworks from "@fireworks-js/react";
import { createPortal } from "react-dom";

export const SetupAccountNextStep = () => {
  const { fireworksRef } = useFireworks();

  const { t } = useTranslation("copilot-setup-account");

  useEffect(() => {
    const interval = setInterval(() => {
      fireworksRef.current?.updateOptions({
        rocketsPoint: {
          max: 0,
        },
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [fireworksRef]);
  return (
    <div className="flex flex-col justify-center space-y-2 text-center">
      <Modal.Header />
      {createPortal(
        <Fireworks
          ref={fireworksRef}
          className="pointer-events-none absolute inset-0 z-[99999] overflow-visible"
          options={{
            traceSpeed: 5,
            delay: { min: 10, max: 20 },
            explosion: 7,
          }}
        />,
        document.body,
      )}
      <div className="self-center">
        <IconContainer type={ICONS_TYPES.BIG_HANDS} />
      </div>
      <h1 className="font-bold text-base">{t("nextsteps.title")}</h1>
      <p className="text-sm">{t("nextsteps.body")}</p>

      <ButtonsNextSteps />
    </div>
  );
};
