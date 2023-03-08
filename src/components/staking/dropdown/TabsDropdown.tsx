import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { tabContent } from "../../staking/Tabs/Content";

import DropdownArrow from "../../common/images/icons/DropdownArrow";
const TabsDropdown = ({
  content,
  setActiveTab,
}: {
  content: tabContent[];
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const values = content;
  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectedValue) {
      return (
        <div className="capitalize px-3 font-semibold">
          <span>{selectedValue}</span>
        </div>
      );
    }
    return (
      <div className="capitalize px-3 font-semibold">{values[0].title}</div>
    );
  };

  const onItemClick = (option: tabContent) => {
    setSelectedValue(option.title);
    setActiveTab(option.id);
  };

  return (
    <div
      className={`px-3 py-2 text-left relative w-full cursor-pointer text-black bg-white rounded ${
        showMenu ? "rounded-b-none" : ""
      }`}
    >
      <div
        onClick={handleInputClick}
        className=" flex items-center justify-between select-none"
      >
        {showMenu && (
          <div className="absolute w-full translate-y-9 left-0 top-[4px] overflow-auto max-h-36 bg-white capitalize rounded rounded-t-none">
            {values.map((option) => {
              return (
                <div
                  onClick={() => onItemClick(option)}
                  key={option.title}
                  className={`px-6 py-3 cursor-pointer hover:bg-gray flex justify-between font-semibold
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
