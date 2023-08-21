// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosCopilotIcon } from "icons";
import { t } from "../locales/translate";
import { TranslationContextProvider } from "schummar-translate/react";
export const Introduction = () => {
  return (
    <TranslationContextProvider locale="en">
      <div className="flex flex-col space-y-3">
        <EvmosCopilotIcon />
        <h3 className="font-bold">{t("copilot.intro.title")}</h3>
        <h4 className="text-gray1 text-sm">{t("copilot.intro.description")}</h4>
      </div>
    </TranslationContextProvider>
  );
};
