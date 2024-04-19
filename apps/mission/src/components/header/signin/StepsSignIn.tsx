// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Menu } from "@headlessui/react";
import { ProfileButton, SignInButton } from "./Buttons";
import { SignInTitle, WalletsTitle } from "./Titles";
import { Wallets } from "./Wallets";
import { SignInOptions } from "./Options";
import { useSignIn } from "./useSignin";
import { useEffect, useState } from "react";
import { getActiveProviderKey, useWallet } from "@evmosapps/evmos-wallet";
import { Profile } from "./Profile";
import { Settings } from "./Settings";

import useComponentVisible from "./useComponentVisible";
import { Spinner } from "./Spinner";

export const StepsSignIn = () => {
  const { defaultWallets } = useSignIn();

  const [dropdownStatus, setDropdownStatus] = useState("profile");

  const {
    connector,
    address,
    isHydrating,
    isReconnecting,
    isDisconnected,
    isConnecting,
  } = useWallet();

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();

  useEffect(() => {
    const status = localStorage.getItem("redirect-wallet");
    if (status === "true") {
      setIsComponentVisible(true);
      localStorage.removeItem("redirect-wallet");
    }
  }, [setIsComponentVisible]);
  const drawButton = () => {
    if (isDisconnected || isConnecting) {
      return <SignInButton open={isComponentVisible} />;
    }
    if (address && connector) {
      return <ProfileButton />;
    }
  };

  const drawContent = () => {
    if (
      isDisconnected ||
      isConnecting ||
      (address && connector && dropdownStatus === "wallets")
    ) {
      return (
        <>
          {dropdownStatus === "wallets" ? (
            <WalletsTitle setDropdownStatus={setDropdownStatus} />
          ) : (
            <SignInTitle />
          )}
          <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark mt-5 ">
            <Wallets wallets={defaultWallets} />
          </div>
          <SignInOptions close={() => setIsComponentVisible(false)} />
        </>
      );
    }
    if (address && connector && dropdownStatus === "settings") {
      return <Settings setDropdownStatus={setDropdownStatus} />;
    }

    if (address && connector && dropdownStatus === "profile") {
      return (
        <Profile
          setDropdownStatus={setDropdownStatus}
          setIsOpen={setIsComponentVisible}
          connector={connector}
        />
      );
    }
  };

  if (isHydrating || isReconnecting) {
    return (
      // TOdo: Mili: Add same padding as button
      <div className="animate-pulse text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 pt-6 pb-2 font-bold w-28 h-full">
        &nbsp;
      </div>
    );
  }

  return (
    <div className="relative">
      <Menu>
        {() => (
          <>
            <Menu.Button
              onClick={(e) => {
                e.preventDefault();
                setIsComponentVisible(!isComponentVisible);
              }}
            >
              {drawButton()}
            </Menu.Button>
            {isComponentVisible && (
              <Menu.Items
                ref={ref}
                static
                className="space-y-5 z-10 text-center text-sm absolute right-0 mt-7 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl pt-6 p-3"
              >
                {drawContent()}
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};
