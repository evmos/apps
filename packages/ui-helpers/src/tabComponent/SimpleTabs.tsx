"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo, useState } from "react";
import { TabNavItemWithBorder } from "./TabNewItemWithBorder";
import { TabContent } from "./TabContent";

type tabContent = {
  title: string;
  id: string;
  content: JSX.Element;
};

export const SimpleTabs = ({ tabsContent }: { tabsContent: tabContent[] }) => {
  const [activeTab, setActiveTab] = useState(tabsContent[0]?.id ?? "");

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
      <div className="sticky top-0 z-[9] flex w-full justify-between space-x-2 overflow-auto py-2 md:space-x-0">
        <ul className="text-pearl flex w-fit items-center justify-between rounded">
          {tabItems}
        </ul>
      </div>

      <div className="text-pearl">{tabContent}</div>
    </div>
  );
};
