// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { useCallback } from "react";
import metrics from "../LocalTracker";
import { MC_VIEW_STAKING } from "tracker";
const Header = () => {
  const handlePreClickAction = useCallback(() => {
    return metrics?.track(MC_VIEW_STAKING);
  }, []);
  return (
    <div className="mb-6 flex w-full justify-between">
      <span className="font-[GreyCliff] text-xl font-bold text-pearl">
        STAKING
      </span>
      <div className="flex gap-2">
        <Link
          href={{
            pathname: "/staking",
          }}
        >
          {/* TODO: use button component */}
          <div
            className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity"
            onClick={handlePreClickAction}
          >
            <span>VIEW STAKING</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
