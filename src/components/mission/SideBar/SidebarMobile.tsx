import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../../common/images/icons/CloseIcon";
import Logo from "../../common/images/Logo";
import SideBar from "./SideBar";

const SidebarMobile = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleOnClick = () => {
    setShowSidebar(false);
  };
  return (
    <div
      className={`fixed inset-0 bg-blackOpacity z-50 ${
        showSidebar ? "flex" : "hidden"
      }`}
    >
      <div className=" bg-darkGray1 w-full p-5 ">
        <div className="flex items-center justify-between">
          <Link
            href="https://app.evmos.org"
            rel="noreferrer"
            className="xl:pr-14"
            aria-label="home"
          >
            <Logo className="w-32 xl:w-36 h-20 text-pearl" />
          </Link>
          <CloseIcon
            onClick={handleOnClick}
            className="text-pearl cursor-pointer"
          />
        </div>

        <SideBar />
      </div>
    </div>
  );
};

export default SidebarMobile;
