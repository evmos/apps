// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { CommonWealthIcon } from "icons";
import { MC_DISCUSSION, MC_DOCS, MC_VOTE } from "tracker";
import { useCallback } from "react";
import metrics from "../LocalTracker";
const Header = () => {
  const votePreClickAction = useCallback(() => {
    return metrics?.track(MC_VOTE);
  }, []);

  const docsPreClickAction = useCallback(() => {
    return metrics?.track(MC_DOCS);
  }, []);

  const discussionPreClickAction = useCallback(() => {
    return metrics?.track(MC_DISCUSSION);
  }, []);

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
            onClick={votePreClickAction}
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
            onClick={docsPreClickAction}
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
            onClick={discussionPreClickAction}
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
