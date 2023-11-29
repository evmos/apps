"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Card } from "./card";
import { CardDescription } from "./card-description";
import { CardTitle } from "./card-title";
import { useTranslation } from "@evmosapps/i18n/client";

import { CLICK_ON_SEE_PORTFOLIO } from "tracker";
import { ButtonWithLink, TrackerEvent } from "@evmosapps/ui-helpers";

export const AssetsCard = () => {
  const { t } = useTranslation("dappStore");

  return (
    <Card className="bg-[url(/alaniso-2.png)]">
      <div>
        <CardTitle firstWord={"Evmos"} secondWord={t("card.assets.title")} />
        <CardDescription text={t("card.assets.description")} />
        <hr className="text-pearl/30" />
      </div>
      <TrackerEvent event={CLICK_ON_SEE_PORTFOLIO}>
        <ButtonWithLink href="/portfolio" className="w-full">
          {t("card.assets.button.text")}
        </ButtonWithLink>
      </TrackerEvent>
    </Card>
  );
};
