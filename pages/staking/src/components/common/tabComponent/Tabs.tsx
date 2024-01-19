// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { tabContent } from "../../staking/Tabs/Content";
import ValidatorToggle from "../Toggle";
import { TabContent } from "@evmosapps/ui-helpers";
const TabNavItem = dynamic(() => import("./TabNavItem"));
const Search = dynamic(() => import("../searchBar/Search"));
const TabsDropdown = dynamic(() => import("./TabsDropdown"));

const Tabs = ({
  tabsContent,
  placeholder,
}: {
  tabsContent: tabContent[];
  placeholder?: string;
}) => {
  const [activeTab, setActiveTab] = useState(tabsContent?.[0]?.id ?? "");

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
    <div className="min-h-[200px] space-y-4 px-2">
      {/* z-[9] was added so when the user scrolls, the Manage button 
      does not appear above the search validators component 
     the value should be lower than the modal z-index
*/}
      <div className="sticky top-0 z-[9] flex w-full flex-col justify-between gap-2 space-x-2 bg-darkGray1 py-2 md:flex-row md:space-x-0">
        <div className="md:hidden ">
          <TabsDropdown content={tabsContent} setActiveTab={setActiveTab} />
        </div>
        <div className="hidden md:flex">
          <ValidatorToggle />
        </div>
        <ul className="hidden w-fit items-center justify-between rounded border-2 border-pearl md:flex ">
          {tabItems}
        </ul>
        <Search placeholder={placeholder ? placeholder : ""} />
        <div className="md:hidden">
          <ValidatorToggle />
        </div>
      </div>

      <div className="text-pearl">{tabContent}</div>
    </div>
  );
};

export default Tabs;
