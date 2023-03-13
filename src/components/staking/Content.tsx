import dynamic from "next/dynamic";
import { SearchWrapper } from "../../internal/common/context/SearchContext";
import { tabsContent } from "./Tabs/Content";

const TopBarStaking = dynamic(() => import("./components/TopBarStaking"));
const Tabs = dynamic(() => import("../common/tabComponent/Tabs"));

const Content = () => {
  return (
    <SearchWrapper>
      <div className="">
        <TopBarStaking />
        <div className=" mt-5 overflow-y-auto max-h-[33vh] sm:max-h-[45vh] lg:max-h-[53vh] xl:scrollbar-hide text-white font-[IBM] w-full px-2">
          <Tabs tabsContent={tabsContent} />
        </div>
      </div>
    </SearchWrapper>
  );
};

export default Content;
