// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useRouter } from "next/router";
import { Button } from "../Button";
import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";
import { useTranslation } from "next-i18next";
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

  const { t } = useTranslation();
  return (
    <Card>
      <>
        <div>
          <Title
            firstWord={t("evmos.token")}
            secondWord={t("dappStore.card.governance.title")}
          />
          <Description text={t("dappStore.card.governance.description")} />
        </div>
        <Button
          text={t("dappStore.card.governance.button.text")}
          handleOnClick={handleOnClick}
        />
      </>
    </Card>
  );
};
