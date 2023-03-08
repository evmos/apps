import { useMemo, useState } from "react";
import TabsDropdown from "../../staking/dropdown/TabsDropdown";
import { tabContent } from "../../staking/Tabs/Content";
import Search from "../searchBar/Search";
import TabContent from "./TabContent";
import TabNavItem from "./TabNavItem";

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
    <div className="space-y-8 px-2">
      <div className="flex justify-between space-x-2 md:space-x-0 w-full">
        <div className="md:hidden ">
          <TabsDropdown content={tabsContent} setActiveTab={setActiveTab} />
        </div>
        <ul className="hidden w-fit md:flex items-center justify-between border-2 border-pearl rounded">
          {tabItems}
        </ul>
        <Search placeholder="Search validators..." />
      </div>

      <div className="text-white">{tabContent}</div>
    </div>
  );
};

export default Tabs;
