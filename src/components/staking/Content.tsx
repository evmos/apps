import dynamic from "next/dynamic";
import { SearchWrapper } from "../../internal/common/context/SearchContext";
import { EVMOS_PAGE_URL, NAV_TO_MISSION_CONTROL } from "../common/constants";
import NavToMissionControl from "../common/navigation/NavToMissionControl";
import { tabsContent } from "./Tabs/Content";

const TopBarStaking = dynamic(() => import("./components/TopBarStaking"));
const Tabs = dynamic(() => import("../common/tabComponent/Tabs"));

const Content = () => {
  return (
    <SearchWrapper>
      <div className="">
        <NavToMissionControl
          href={EVMOS_PAGE_URL}
          text={NAV_TO_MISSION_CONTROL}
        />
        <TopBarStaking />
        <div className=" mt-5 overflow-y-auto max-h-[33vh] sm:max-h-[45vh] lg:max-h-[53vh] xl:scrollbar-hide text-pearl font-[IBM] w-full px-2">
          <Tabs tabsContent={tabsContent} placeholder="Search Validators..." />
        </div>
      </div>
    </SearchWrapper>
  );
};

export default Content;
