"use client";

import { Menu } from "@headlessui/react";
import { ProfileButton } from "./Buttons";

import { Wallets } from "./Wallets";
import { useSignIn2 } from "./useSignin2";
import { Dispatch, SetStateAction } from "react";
import { WalletsTitle } from "./Titles";

export const ChangeWallet = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { defaultWallets } = useSignIn2();
  return (
    <div className="relative">
      <Menu>
        {({}) => (
          <>
            <ProfileButton />

            <Menu.Items
              static
              className="text-center justify-center items-center space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3"
            >
              <WalletsTitle setDropdownStatus={setDropdownStatus} />

              <Wallets wallets={defaultWallets} />
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
