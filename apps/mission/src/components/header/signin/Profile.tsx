"use client";

import { Menu } from "@headlessui/react";
import { useState } from "react";
import { Connector } from "wagmi";
import { Settings } from "./Settings";
import { ProfileButton } from "./Buttons";
import { ProfileTitle } from "./Titles";
import { ProfileOptions, ProfileSettings } from "./Options";
import { ChangeWallet } from "./ChangeWallet";

export const Profile = ({ connector }: { connector: Connector }) => {
  const [dropdownStatus, setDropdownStatus] = useState("profile");

  if (connector && dropdownStatus === "settings") {
    return <Settings setDropdownStatus={setDropdownStatus} />;
  }

  if (connector && dropdownStatus === "wallets") {
    return <ChangeWallet setDropdownStatus={setDropdownStatus} />;
  }

  return (
    <div className="relative">
      <Menu>
        {({}) => (
          <>
            <Menu.Button>
              <ProfileButton />
            </Menu.Button>

            <Menu.Items className="text-center justify-center items-center space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3">
              <ProfileTitle
                connector={connector}
                setDropdownStatus={setDropdownStatus}
              />

              <ProfileOptions />
              <ProfileSettings setDropdownStatus={setDropdownStatus} />
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
