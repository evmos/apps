"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useRouter } from "next/navigation";
import { Button } from "../Button";
import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";
import { useTranslation } from "@evmosapps/i18n/client";

import { CLICK_ON_PARTICIPATE_IN_GOVERNANCE, useTracker } from "tracker";

export const GovernanceCard = () => {
  const router = useRouter();
  const { handlePreClickAction } = useTracker(
    CLICK_ON_PARTICIPATE_IN_GOVERNANCE
  );
  const handleOnClick = () => {
    handlePreClickAction();
    router.push("/governance");
  };

  const { t } = useTranslation("dappStore");
  return (
    <Card>
      <div>
        <Title firstWord={"Evmos"} secondWord={t("card.governance.title")} />
        <Description text={t("card.governance.description")} />
      </div>
      <Button onClick={handleOnClick}>
        {t("card.governance.button.text")}
      </Button>
    </Card>
  );
};