// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "next-i18next";
import { Dispatch, SetStateAction } from "react";
import { CreditCardsIcon, EthereumIcon } from "icons";

export const Intro = ({
  setTopUpType,
}: {
  setTopUpType: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();

  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <h3 className="font-bold">{t("topup.intro.title")}</h3>
        <p className="text-sm text-[#413836]">{t("topup.intro.body")}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 text-sm font-medium">
        <button
          onClick={() => setTopUpType("card")}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#DBD3D1] py-4 px-2"
        >
          <CreditCardsIcon />
          {t("topup.card.button")}
        </button>
        <button
          disabled={true}
          className="flex flex-col items-center gap-2 rounded-lg border border-[#DBD3D1] bg-[#F3F3F3] py-4 px-2 opacity-50"
        >
          <div className="flex  items-center justify-center gap-2">
            <EthereumIcon />
            {t("topup.crypto.button")}
          </div>
          <span className="rounded-full bg-[#DBD3D1] px-3 py-0.5 font-normal">
            {t("topup.intro.crypto.button.comingsoon")}
          </span>
        </button>
      </div>
    </section>
  );
};
