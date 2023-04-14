import { useMemo, useState } from "react";
import { tabContent } from "./Content";

import { TabNavItemWithBorder, TabContent } from "ui-helpers";

const Tabs = ({ tabsContent }: { tabsContent: tabContent[] }) => {
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
    <div className="min-h-[200px] px-2">
      {/* z-[9] was added so when the user scrolls, the Manage button 
      does not appear above the search validators component 
     the value should be lower than the modal z-index
*/}
      <div className="sticky top-0 z-[9] flex w-full justify-between space-x-2 py-2 md:space-x-0">
        <ul className="hidden w-fit items-center justify-between rounded md:flex ">
          {tabItems}
        </ul>
      </div>

      <div className="text-pearl">{tabContent}</div>
    </div>
  );
};

export default Tabs;
