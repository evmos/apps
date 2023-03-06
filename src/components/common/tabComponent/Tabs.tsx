import { useState } from "react";
import { tabContent } from "../../staking/Tabs/Content";
import TabContent from "./TabContent";
import TabNavItem from "./TabNavItem";

const Tabs = ({ tabsContent }: { tabsContent: tabContent[] }) => {
  const [activeTab, setActiveTab] = useState(tabsContent[0].id);

  return (
    <div className="space-y-8">
      <ul className="w-fit flex items-center justify-between border border-pearl rounded">
        {tabsContent?.map((item) => {
          return (
            <TabNavItem
              key={item.id}
              title={item.title}
              id={item.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          );
        })}
      </ul>

      <div className="text-white">
        {tabsContent?.map((item) => {
          return (
            <TabContent id={item.id} activeTab={activeTab} key={item.id}>
              {item.content}
            </TabContent>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
