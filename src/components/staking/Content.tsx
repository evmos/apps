import Tabs from "../common/tabComponent/Tabs";
import { tabsContent } from "./Tabs/Content";

const Content = () => {
  return (
    <>
      <Tabs tabsContent={tabsContent} />
      {/* <div className=" mt-5 overflow-y-auto max-h-[50vh] lg:max-h-[50vh] xl:scrollbar-hide text-white font-[IBM] w-full px-2">
      </div> */}
    </>
  );
};

export default Content;
