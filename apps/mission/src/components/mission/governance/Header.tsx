// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { CommonWealthIcon } from "icons";
import {
  CLICK_MISSION_CONTROL_GOVERNANCE_DISCUSSION_BUTTON,
  CLICK_MISSION_CONTROL_GOVERNANCE_DOCS_BUTTON,
  CLICK_MISSION_CONTROL_GOVERNANCE_VOTE_BUTTON,
  useTracker,
} from "tracker";

const Header = () => {
  const { handlePreClickAction: trackVoteClick } = useTracker(
    CLICK_MISSION_CONTROL_GOVERNANCE_VOTE_BUTTON
  );
  const { handlePreClickAction: trackDocsClick } = useTracker(
    CLICK_MISSION_CONTROL_GOVERNANCE_DOCS_BUTTON
  );
  const { handlePreClickAction: trackDiscussionClick } = useTracker(
    CLICK_MISSION_CONTROL_GOVERNANCE_DISCUSSION_BUTTON
  );

  return (
    <div className="mb-6 flex w-full justify-between">
      <span className="font-[GreyCliff] text-xl font-bold text-pearl">
        GOVERNANCE
      </span>
      <div className="flex gap-2">
        <Link
          href={{
            pathname: "/governance",
          }}
        >
          {/* TODO: use button component */}
          <div
            className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity"
            onClick={() => {
              trackVoteClick();
            }}
          >
            <span>VOTE</span>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://evmos.community"
          aria-label="docs"
        >
          {/* TODO: use button component */}
          <div
            className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity"
            onClick={() => {
              trackDocsClick();
            }}
          >
            <span>DOCS</span>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://commonwealth.im/evmos"
          aria-label="docs"
        >
          {/* TODO: use button component */}
          <div
            className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity"
            onClick={() => {
              trackDiscussionClick();
            }}
          >
            <CommonWealthIcon width={16} height={16} />
            <span>DISCUSSION</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
