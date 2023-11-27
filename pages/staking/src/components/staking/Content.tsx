// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";

import { tabsContent } from "./Tabs/Content";
import { SearchWrapper } from "../context/SearchContext";
import { ValidatorStateWrapper } from "../context/ValidatorStateContext";
const TopBarStaking = dynamic(() => import("./components/TopBarStaking"));
const Tabs = dynamic(() => import("../common/tabComponent/Tabs"));

const Content = () => {
  return (
    <SearchWrapper>
      <ValidatorStateWrapper>
        <div className="">
          <TopBarStaking />
          <div className=" xl:scrollbar-hide mt-5 w-full px-2 text-pearl">
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
