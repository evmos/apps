// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { CloseIcon, Logo } from "icons";
import SideBar from "./Sidebar";

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
      className={`fixed inset-0 z-50 bg-blackOpacity ${
        showSidebar ? "flex" : "hidden"
      }`}
    >
      <div className=" w-full bg-darkGray1 p-5 ">
        <div className="flex items-center justify-between">
          <Link
            href="https://app.evmos.org"
            rel="noreferrer"
            className="xl:pr-14"
            aria-label="home"
          >
            <Logo className="h-20 w-32 text-pearl xl:w-36" />
          </Link>
          <CloseIcon
            onClick={handleOnClick}
            className="cursor-pointer text-pearl"
          />
        </div>

        <SideBar />
      </div>
    </div>
  );
};

export default SidebarMobile;
