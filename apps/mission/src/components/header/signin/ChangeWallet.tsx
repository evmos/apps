"use client";

import { Menu } from "@headlessui/react";
import { ProfileButton } from "./Buttons";

import { Wallets } from "./Wallets";
import { useSignIn2 } from "./useSignin2";

export const ChangeWallet = () => {
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
              {/* <SettingsTitle /> */}title
              <Wallets wallets={defaultWallets} />
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
