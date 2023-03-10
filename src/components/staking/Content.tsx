import { SearchWrapper } from "../../internal/common/context/SearchContext";
import Tabs from "../common/tabComponent/Tabs";
import { tabsContent } from "./Tabs/Content";
import TopBarStaking from "./components/TopBarStaking";

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
