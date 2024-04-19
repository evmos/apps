// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Menu } from "@headlessui/react";

import { useWallet } from "@evmosapps/evmos-wallet";
import { Profile } from "./Profile";
import { SignInButton } from "./Buttons";
import { SignInTitle } from "./Titles";
import { Wallets } from "./Wallets";
import { SignInOptions } from "./Options";
import { useSignIn } from "./useSignin";
import { useEffect, useState } from "react";

export const SignIn = () => {
  const { connector, address, isHydrating, isReconnecting } = useWallet();
  const { defaultWallets } = useSignIn();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const status = localStorage.getItem("redirect-wallet");
    if (status === "true") {
      setIsOpen(true);
      localStorage.removeItem("redirect-wallet");
    }
  }, []);

  if (isHydrating || isReconnecting) {
    return (
      <div className="animate-pulse text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 pt-6 pb-2 font-bold w-28 h-full">
        &nbsp;
      </div>
    );
  }
  if (address && connector) {
    return <Profile connector={connector} />;
  }

  return (
    <div className="relative">
      <Menu>
        {({ close }) => (
          <>
            <Menu.Button as="div" onClick={toggleMenu}>
              <SignInButton open={isOpen} />
            </Menu.Button>
            {isOpen && (
              <Menu.Items
                static
                className="space-y-5 z-10 text-sm absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl pt-6 p-3"
              >
                <SignInTitle />
                <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark ">
                  <Wallets wallets={defaultWallets} />
                </div>
                <SignInOptions close={close} />
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};
