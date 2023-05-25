// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { Footer, useConsent } from "ui-helpers";
import { useTracker, CLICK_FEEDBACK_FOOTER } from "tracker";
import getConfig from "next/config";

export const StatefulFooter = () => {
  const { publicRuntimeConfig } = getConfig();

  const { handlePreClickAction } = useTracker(CLICK_FEEDBACK_FOOTER);
  const { showConsent } = useConsent();
  return (
    <Footer
      version={publicRuntimeConfig?.version}
      onClickFeedback={() => {
        handlePreClickAction();
      }}
      handleCookies={() => {
        showConsent();
      }}
    />
  );
};
