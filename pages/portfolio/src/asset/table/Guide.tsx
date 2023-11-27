// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { QuestionMarkIcon } from "icons";

import { CLICK_CTA_LINKS_REGISTER_TOKEN, useTracker } from "tracker";
import { REGISTER_TOKEN_URL } from "constants-helper/src/constants";
import { PrimaryLink } from "@evmosapps/ui-helpers";
const Guide = () => {
  const { handlePreClickAction } = useTracker(CLICK_CTA_LINKS_REGISTER_TOKEN);
  return (
    <div className="flex items-center space-x-3 text-pearl">
      <QuestionMarkIcon width={20} height={20} />
      <div>
        Don&apos;t see your token?{" "}
        <PrimaryLink
          aria-label="register your token"
          href={REGISTER_TOKEN_URL}
          onClick={() => {
            handlePreClickAction();
          }}
        >
          Register your token here.
        </PrimaryLink>
      </div>
    </div>
  );
};

export default Guide;
