import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { tabContent } from "../../staking/Tabs/Content";

const TabNavItem = dynamic(() => import("./TabNavItem"));
const TabContent = dynamic(() => import("./TabContent"));
const Search = dynamic(() => import("../searchBar/Search"));
const TabsDropdown = dynamic(
  () => import("../../staking/dropdown/TabsDropdown")
);

const Tabs = ({ tabsContent }: { tabsContent: tabContent[] }) => {
  const [activeTab, setActiveTab] = useState(tabsContent[0].id);

  const tabItems = useMemo(() => {
    return tabsContent?.map((item) => {
      return (
        <TabNavItem
          key={item.id}
          title={item.title}
          id={item.id}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      );
    });
  }, [tabsContent, activeTab]);

  const tabContent = useMemo(() => {
    return tabsContent?.map((item) => {
      return (
        <TabContent id={item.id} activeTab={activeTab} key={item.id}>
          {item.content}
        </TabContent>
      );
    });
  }, [tabsContent, activeTab]);

  return (
    <div className="space-y-4 px-2 min-h-[200px]">
      <div className="z-[999] py-2 flex justify-between space-x-2 md:space-x-0 w-full sticky top-0 bg-black">
        <div className="md:hidden ">
          <TabsDropdown content={tabsContent} setActiveTab={setActiveTab} />
        </div>
        <ul className="hidden w-fit md:flex items-center justify-between border-2 border-pearl rounded ">
          {tabItems}
        </ul>
        <Search placeholder="Search validators..." />
      </div>

      <div className="text-white">{tabContent}</div>
    </div>
  );
};

export default Tabs;
