import { SearchWrapper } from "../../internal/common/context/SearchContext";
import Tabs from "../common/tabComponent/Tabs";
import { tabsContent } from "./Tabs/Content";

const Content = () => {
  return (
    <SearchWrapper>
      <div className="">
        <Tabs tabsContent={tabsContent} />
        {/* <div className=" mt-5 overflow-y-auto max-h-[50vh] lg:max-h-[50vh] xl:scrollbar-hide text-white font-[IBM] w-full px-2">
      </div> */}
      </div>
    </SearchWrapper>
  );
};

export default Content;
