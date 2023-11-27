// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CLICK_ON_GIVE_FEEDBACK_MAIN_PAGE, useTracker } from "tracker";
import { Feedback } from "@evmosapps/ui-helpers";
export const GiveFeedback = () => {
  const { handlePreClickAction } = useTracker(CLICK_ON_GIVE_FEEDBACK_MAIN_PAGE);

  const handleClick = () => {
    handlePreClickAction();
  };

  return <Feedback text="Give us Feedback" handleClick={handleClick} />;
};
