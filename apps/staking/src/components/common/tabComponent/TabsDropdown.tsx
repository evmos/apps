// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { tabContent } from "../../staking/Tabs/Content";

import { DropdownArrow } from "icons";
import { CLICK_TABS_STAKING_OPTIONS, useTracker } from "tracker";

const TabsDropdown = ({
  content,
  setActiveTab,
}: {
  content: tabContent[];
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  const [showMenu, setIsOpenMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  useEffect(() => {
    const handler = () => setIsOpenMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setIsOpenMenu(!showMenu);
    },
    [showMenu]
  );

  const getDisplay = useCallback(() => {
    if (selectedValue) {
      return (
        <div className="px-3 font-semibold capitalize">
          <span>{selectedValue}</span>
        </div>
      );
    }
    return (
      <div className="px-3 font-semibold capitalize">{content[0].title}</div>
    );
  }, [content, selectedValue]);

  const { handlePreClickAction } = useTracker(CLICK_TABS_STAKING_OPTIONS);

  const onItemClick = useCallback(
    (option: tabContent) => {
      setSelectedValue(option.title);
      setActiveTab(option.id);
      handlePreClickAction({
        tabSelected: option.title,
      });
    },
    [setActiveTab, handlePreClickAction]
  );

  return (
    <div
      className={`relative z-[9999] w-full cursor-pointer rounded bg-white px-3 py-2 text-left text-black ${
        showMenu ? "rounded-b-none" : ""
      }`}
    >
      <div
        onClick={handleInputClick}
        className=" flex select-none items-center justify-between"
      >
        {showMenu && (
          <div className="absolute left-0 top-[4px] max-h-36 w-full translate-y-9 overflow-auto rounded rounded-t-none bg-white capitalize">
            {content?.map((option) => {
              return (
                <div
                  onClick={() => onItemClick(option)}
                  key={option.title}
                  className={`flex cursor-pointer justify-between px-6 py-3 font-semibold hover:bg-gray
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <span>{option.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {getDisplay()}
        <div className="ml-10">
          <DropdownArrow />
        </div>
      </div>
    </div>
  );
};

export default TabsDropdown;
