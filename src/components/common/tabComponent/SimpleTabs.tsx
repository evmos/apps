import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { tabContent } from "../../staking/Tabs/Content";

const TabNavItemWithBorder = dynamic(() => import("./TabNavItemWithBorder"));
const TabContent = dynamic(() => import("./TabContent"));

const SimpleTabs = ({ tabsContent }: { tabsContent: tabContent[] }) => {
  const [activeTab, setActiveTab] = useState(tabsContent[0].id);

  const tabItems = useMemo(() => {
    return tabsContent?.map((item) => {
      return (
        <TabNavItemWithBorder
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
    <div className="px-2 min-h-[200px]">
      {/* z-[9] was added so when the user scrolls, the Manage button 
      does not appear above the search validators component 
     the value should be lower than the modal z-index
*/}
      <div className="z-[9] py-2 flex justify-between space-x-2 md:space-x-0 w-full sticky top-0 overflow-auto">
        <ul className="w-fit flex items-center justify-between rounded text-pearl">
          {tabItems}
        </ul>
      </div>

      <div className="text-pearl">{tabContent}</div>
    </div>
  );
};

export default SimpleTabs;
