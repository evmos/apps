// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { QuestionMarkIcon } from "@evmosapps/icons/QuestionMarkIcon";

import { CLICK_CTA_LINKS_REGISTER_TOKEN } from "tracker";
import { REGISTER_TOKEN_URL } from "@evmosapps/constants";
import { PrimaryLink, TrackerEvent } from "@evmosapps/ui-helpers";
const Guide = () => {
  return (
    <div className="flex items-center space-x-2 text-pearl text-sm">
      <QuestionMarkIcon className="shrink-0" width={20} height={20} />
      <div>
        Don&apos;t see your token?{" "}
        <TrackerEvent event={CLICK_CTA_LINKS_REGISTER_TOKEN}>
          <PrimaryLink href={REGISTER_TOKEN_URL}>
            Register your token here.
          </PrimaryLink>
        </TrackerEvent>
      </div>
    </div>
  );
};

export default Guide;
