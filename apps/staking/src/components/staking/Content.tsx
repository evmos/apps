// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import { SearchWrapper } from "../../internal/common/context/SearchContext";
import { ValidatorStateWrapper } from "../../internal/common/context/ValidatorStateContext";
import { Navigation } from "ui-helpers";
import { tabsContent } from "./Tabs/Content";
import { NAV_TO_MISSION_CONTROL, EVMOS_PAGE_URL } from "constants-helper";
const TopBarStaking = dynamic(() => import("./components/TopBarStaking"));
const Tabs = dynamic(() => import("../common/tabComponent/Tabs"));
import { CLICK_BACK_TO_MC, useTracker } from "tracker";

const Content = () => {
  const { handlePreClickAction } = useTracker(CLICK_BACK_TO_MC);
  return (
    <SearchWrapper>
      <ValidatorStateWrapper>
        <div className="">
          <Navigation
            href={EVMOS_PAGE_URL}
            text={NAV_TO_MISSION_CONTROL}
            onClick={handlePreClickAction}
          />
          <TopBarStaking />
          <div className=" xl:scrollbar-hide mt-5 max-h-[33vh] w-full overflow-y-auto px-2 font-[IBM] text-pearl sm:max-h-[45vh] lg:max-h-[53vh]">
            <Tabs
              tabsContent={tabsContent}
              placeholder="Search Validators..."
            />
          </div>
        </div>
      </ValidatorStateWrapper>
    </SearchWrapper>
  );
};

export default Content;
