import dynamic from "next/dynamic";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { tabContent } from "../../staking/Tabs/Content";

const DropdownArrow = dynamic(() => import("../images/icons/DropdownArrow"));
const TabsDropdown = ({
  content,
  setActiveTab,
}: {
  content: tabContent[];
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setShowMenu(!showMenu);
    },
    [showMenu]
  );

  const getDisplay = useCallback(() => {
    if (selectedValue) {
      return (
        <div className="capitalize px-3 font-semibold">
          <span>{selectedValue}</span>
        </div>
      );
    }
    return (
      <div className="capitalize px-3 font-semibold">{content[0].title}</div>
    );
  }, [content, selectedValue]);

  const onItemClick = useCallback(
    (option: tabContent) => {
      setSelectedValue(option.title);
      setActiveTab(option.id);
    },
    [setActiveTab]
  );

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
            {content?.map((option) => {
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
