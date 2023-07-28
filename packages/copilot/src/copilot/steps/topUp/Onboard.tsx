// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CheckIcon, CreditCardsIcon, EthereumIcon } from "icons";
import { SuccessTopUp } from "./SuccessTopUp";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../../../locales/translate";
export default function Onboard({
  topUpType,
  children,
}: {
  topUpType: string;
  children: JSX.Element;
}) {
  return (
    <TranslationContextProvider locale="en">
      <section className="space-y-10">
        <div className="space-y-3">
          <h3 className="font-bold">{t("topup.onboard.title")}</h3>
          <div className="grid grid-cols-1 gap-4 text-sm font-medium md:grid-cols-2">
            <button
              className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 ${
                topUpType === "card"
                  ? "border-red border-2"
                  : "border-strokeGrey border"
              }`}
            >
              <CreditCardsIcon />
              {t("topup.card.button")}
              {topUpType === "card" && (
                <div className="bg-red text-pearl flex h-5 w-5 items-center justify-center rounded-full">
                  <CheckIcon width={"14px"} height={"14px"} color="#fff" />
                </div>
              )}
            </button>
            <button
              disabled={true}
              className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 opacity-50 ${
                topUpType === "crypto"
                  ? "border-red border-2"
                  : "border-strokeGrey border"
              }`}
            >
              <EthereumIcon />
              {t("topup.crypto.button")}
            </button>
          </div>
        </div>
        <SuccessTopUp />
        {children}
      </section>
    </TranslationContextProvider>
  );
}
