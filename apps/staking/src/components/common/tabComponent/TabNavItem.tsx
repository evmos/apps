import { Dispatch, SetStateAction } from "react";

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
  const handleClick = () => {
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
