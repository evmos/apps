// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { QuestionMarkIcon } from "icons";
import AssetsGuide from "../modals/AssetsGuide";

import { CLICK_CTA_LINKS_REGISTER_TOKEN, useTracker } from "tracker";
const Guide = () => {
  const { handlePreClickAction } = useTracker(CLICK_CTA_LINKS_REGISTER_TOKEN);
  return (
    <div className="flex items-center space-x-3 text-pearl">
      <QuestionMarkIcon width={20} height={20} />
      <div>
        Don&apos;t see your token? Find out how to {/* TODO: add link */}
        <Link
          href="https://github.com/evmos/chain-token-registry"
          rel="noopener noreferrer"
          className="text-red"
          target="_blank"
          onClick={handlePreClickAction}
        >
          register your token
        </Link>{" "}
        or <AssetsGuide />.
      </div>
    </div>
  );
};

export default Guide;
