import { Dispatch, SetStateAction } from "react";

// this is used on the news feed on mission control page
const TabNavItemWithBorder = ({
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
      className={`cursor-pointer text-xs tracking-wider uppercase px-4 py-2 text-center  ${
        activeTab === id ? "border-b-2 border-pearl" : ""
      } 
       
      `}
    >
      {title}
    </li>
  );
};
export default TabNavItemWithBorder;
