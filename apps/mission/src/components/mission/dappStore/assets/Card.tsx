// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useRouter } from "next/router";
import { Button } from "../Button";
import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";
import { useTranslation } from "next-i18next";
import { CLICK_ON_SEE_PORTFOLIO, useTracker } from "tracker";

export const AssetsCard = () => {
  const { handlePreClickAction } = useTracker(CLICK_ON_SEE_PORTFOLIO);

  const router = useRouter();
  const handleOnClick = () => {
    handlePreClickAction();
    router.push("/assets");
  };

  const { t } = useTranslation();
  return (
    <Card>
      <>
        <div>
          <Title
            firstWord={t("evmos.token")}
            secondWord={t("dappStore.card.assets.title")}
          />
          <Description text={t("dappStore.card.assets.description")} />
        </div>
        <Button
          text={t("dappStore.card.assets.button.text")}
          handleOnClick={handleOnClick}
        />
      </>
    </Card>
  );
};
