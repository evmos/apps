"use client";
import { Menu } from "@headlessui/react";

import { useWallet } from "@evmosapps/evmos-wallet";
import { Profile } from "./Profile";
import { SignInButton } from "./Buttons";
import { SignInTitle } from "./Titles";
import { Wallets } from "./Wallets";
import { SignInOptions } from "./Options";

export const SignIn2 = () => {
  const { connector, address, isHydrating, isReconnecting } = useWallet();

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
        {({ open, close }) => (
          <>
            <Menu.Button>
              <SignInButton open={open} />
            </Menu.Button>

            <Menu.Items className="space-y-5 z-10 text-sm absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl pt-6 p-3">
              <SignInTitle />
              <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
                <Wallets />
              </div>
              <SignInOptions close={close} />
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
