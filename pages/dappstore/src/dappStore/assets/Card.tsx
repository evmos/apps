"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useRouter } from "next/navigation";
import { Button } from "../Button";
import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";
import { useTranslation } from "@evmosapps/i18n/client";

import { CLICK_ON_SEE_PORTFOLIO, useTracker } from "tracker";

export const AssetsCard = () => {
  const { handlePreClickAction } = useTracker(CLICK_ON_SEE_PORTFOLIO);

  const router = useRouter();
  const handleOnClick = async () => {
    handlePreClickAction();
    router.push("/portfolio");
  };

  const { t } = useTranslation("dappStore");

  return (
    <Card>
      <>
        <div>
          <Title firstWord={"Evmos"} secondWord={t("card.assets.title")} />
          <Description text={t("card.assets.description")} />
        </div>
        <Button onClick={handleOnClick}>{t("card.assets.button.text")}</Button>
      </>
    </Card>
  );
};