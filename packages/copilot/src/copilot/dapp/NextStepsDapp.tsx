// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ECOSYSTEM_URL, STAKING_URL } from "constants-helper";
import { Button } from "./Button";
import {
  CLICK_ON_STAKE_COPILOT_BANNER,
  CLICK_ON_USE_DAPP_COPILOT_BANNER,
  useTracker,
} from "tracker";
import { t } from "../../locales/translate";

export const NextStepsActionsDapp = ({ status }: { status: string }) => {
  const { handlePreClickAction: clickStake } = useTracker(
    CLICK_ON_STAKE_COPILOT_BANNER
  );
  const { handlePreClickAction: clickDapp } = useTracker(
    CLICK_ON_USE_DAPP_COPILOT_BANNER
  );

  const handleStakeClick = () => {
    clickStake();
    window.open(STAKING_URL);
  };

  const handleUseDappClick = () => {
    clickDapp();
    window.open(ECOSYSTEM_URL);
  };
  return (
    <div className="flex items-center space-x-4">
      <Button
        text={t("dappStore.onboard.nextsteps.button.stake.title") as string}
        onClick={handleStakeClick}
        status={status}
      />
      <Button
        onClick={handleUseDappClick}
        text={t("dappStore.onboard.nextsteps.button.useDapp.title") as string}
        className="text-pearl bg-[#FAF1E442] hover:bg-[#FAF1E430] active:bg-[#FAF1E420]"
        status={status}
      />
    </div>
  );
};
