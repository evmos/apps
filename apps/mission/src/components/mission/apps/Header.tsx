// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { useCallback } from "react";
import { MC_ECOSYSTEM } from "tracker";
import metrics from "../LocalTracker";

const Header = () => {
  const ecosystemPreClickAction = useCallback(() => {
    return metrics?.track(MC_ECOSYSTEM);
  }, []);

  return (
    <div className="mb-6 flex w-full justify-between">
      <span className="font-[GreyCliff] text-xl font-bold text-pearl">
        APPS ON EVMOS
      </span>
      <div className="flex gap-2">
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://evmos.org/ecosystem"
          aria-label="docs"
        >
          {/* TODO: use button component */}
          <div
            className="flex justify-center rounded border border-pearl p-2 font-[GreyCliff] text-xs font-bold uppercase text-pearl hover:bg-whiteOpacity"
            onClick={ecosystemPreClickAction}
          >
            <span>ECOSYSTEM</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
