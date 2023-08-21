// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { StepsContext } from "../container/StepsContext";
import { Button } from "./Button";
import { CLICK_ON_TOP_UP_ACCOUNT_DAPP, useTracker } from "tracker";
import { t } from "../../locales/translate";

export const TopUpDapp = ({ status }: { status: string }) => {
  const { setShowModal } = useContext(StepsContext);
  const { handlePreClickAction } = useTracker(CLICK_ON_TOP_UP_ACCOUNT_DAPP);

  const handleClick = () => {
    handlePreClickAction({ location: "Inside Copilot onboarding banner" });
    setShowModal(true);
  };
  return (
    <Button
      text={t("dappStore.onboard.topup.button.title") as string}
      onClick={handleClick}
      status={status}
    />
  );
};
