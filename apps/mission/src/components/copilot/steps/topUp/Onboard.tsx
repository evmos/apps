// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "next-i18next";
import { CheckIcon, CreditCardsIcon, EthereumIcon } from "icons";
import { SuccessTopUp } from "./SuccessTopUp";

export default function Onboard({
  topUpType,
  children,
}: {
  topUpType: string;
  children: JSX.Element;
}) {
  const { t } = useTranslation();

  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <h3 className="font-bold">{t("topup.onboard.title")}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm font-medium">
          <button
            className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 ${
              topUpType === "card"
                ? "border-2 border-red"
                : "border border-[#DBD3D1]"
            }`}
          >
            <CreditCardsIcon />
            {t("topup.card.button")}
            {topUpType === "card" && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red text-pearl">
                <CheckIcon width={"14px"} height={"14px"} color="#fff" />
              </div>
            )}
          </button>
          <button
            disabled={true}
            className={`flex items-center justify-center gap-1 rounded-md px-3 py-1.5 opacity-50 ${
              topUpType === "crypto"
                ? "border-2 border-red"
                : "border border-[#DBD3D1]"
            }`}
          >
            <EthereumIcon />
            {t("topup.crypto.button")}
          </button>
        </div>
      </div>
      {children}
      <SuccessTopUp />
    </section>
  );
}
