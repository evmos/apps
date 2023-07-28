// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useFireworks } from "./useFireworks";
import { renderFireworksPortal } from "./helpers";
import { useEffect, useRef } from "react";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
import { ButtonsNextSteps } from "./ButtonsNextSteps";
import { HandsEmoji } from "../icons/HandsEmoji";
export const NextSteps = () => {
  const { fireworksRef, portalContainer } = useFireworks();

  const firstUpdate = useRef(true);
  useEffect(() => {
    setInterval(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
      }
    }, 5000);
  }, []);

  return (
    <TranslationContextProvider locale="en">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        {firstUpdate.current &&
          renderFireworksPortal(fireworksRef, portalContainer)}
        <p className="border-lightYellow2 bg-lightYellow2 mb-4 flex h-56 w-56 items-center justify-center rounded-full border text-9xl">
          <HandsEmoji />
        </p>
        <h1 className="font-bold">{t("nextsteps.title")}</h1>
        <p className="text-sm">{t("nextsteps.description")}</p>

        <ButtonsNextSteps />
      </div>
    </TranslationContextProvider>
  );
};
