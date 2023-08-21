// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useContext } from "react";
import { StepsContext } from "../container/StepsContext";
import { Button } from "./Button";
import { CLICK_ON_START_COPILOT_MAIN_PAGE, useTracker } from "tracker";
import { t } from "../../locales/translate";

export const SetUpDapp = ({ status }: { status: string }) => {
  const { setShowModal } = useContext(StepsContext);
  const { handlePreClickAction } = useTracker(CLICK_ON_START_COPILOT_MAIN_PAGE);

  const handleClick = () => {
    handlePreClickAction();
    setShowModal(true);
  };
  return (
    <Button
      text={t("dappStore.onboard.setup.button.title") as string}
      onClick={handleClick}
      status={status}
    />
  );
};
