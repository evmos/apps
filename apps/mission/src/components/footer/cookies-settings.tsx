// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ConsentModalTrigger } from "stateful-components/src/modals/ConsentModal/ConsentModal";
import { useTranslation } from "@evmosapps/i18n/client";
import { CLICK_ON_FOOTER_CTA, sendEvent } from "tracker";

export const CookiesSettings = () => {
  const { t } = useTranslation();
  return (
    <ConsentModalTrigger>
      <p
        aria-label="cookies settings"
        className="cursor-pointer"
        onClick={() => {
          sendEvent(CLICK_ON_FOOTER_CTA, {
            "Footer Social Type": "Cookie Statement",
          });
        }}
      >
        {t("footer.cookiesSettings")}
      </p>
    </ConsentModalTrigger>
  );
};
