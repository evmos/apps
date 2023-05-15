// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { CLICK_TABS_STAKING_OPTIONS, useTracker } from "tracker";

const TabNavItem = ({
  id,
  title,
  activeTab,
  setActiveTab,
}: {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  const { handlePreClickAction } = useTracker(CLICK_TABS_STAKING_OPTIONS, {
    tabSelected: title,
  });
  const handleClick = () => {
    handlePreClickAction();
    setActiveTab(id);
  };

  return (
    <li
      onClick={handleClick}
      className={`cursor-pointer p-4 text-center text-sm font-bold uppercase tracking-wider transition-all duration-200 first:border-r last:border-l ${
        activeTab === id ? "bg-pearl text-darGray800" : "text-pearl"
      } 
       
      `}
    >
      {title}
    </li>
  );
};
export default TabNavItem;
