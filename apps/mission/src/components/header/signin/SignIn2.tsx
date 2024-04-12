"use client";
import { Menu } from "@headlessui/react";
import { Button } from "../../../../../../packages/ui/src/button";
import { useSignIn2 } from "./useSignin2";
import { useDisconnect } from "wagmi";

import { useOtherWalletsModal } from "./WalletsModal";
import { useWallet } from "@evmosapps/evmos-wallet";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { Profile } from "./Profile";

export const SignIn2 = () => {
  const { defaultWallets, connectors, connect, error } = useSignIn2();
  const otherWalletsModal = useOtherWalletsModal();

  const {
    connector,
    address,
    isHydrating,
    isConnecting,
    isReconnecting,
    isConnected,
  } = useWallet();

  const [walletSelectedToConnect, setWalletSelectedToConnect] = useState("");

  if (isHydrating || isReconnecting) {
    return (
      <div className="animate-pulse text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold w-28 h-full">
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
        {({ open }) => (
          <>
            <Menu.Button>
              <Button as="div" outlined={open}>
                Sign in
              </Button>
            </Menu.Button>

            <Menu.Items className="space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3">
              <Menu.Item as="div" className="text-center">
                Sign in with wallet
              </Menu.Item>
              {defaultWallets.map((wallet) => {
                if (!wallet) return;
                const Icon = wallet.icon as React.FC<
                  React.SVGAttributes<SVGElement>
                >;
                const connector = connectors.find(
                  (c) => c.name === wallet.name,
                );
                return (
                  <Menu.Item
                    as="button"
                    className="flex w-full items-center border-b border-b-surface-container-high dark:border-b-surface-container-high-dark pt-3 pb-2 px-3 gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 focus:ring-1 focus:ring-tertiary-container focus:dark:ring-tertiary-container-dark"
                    key={wallet.name}
                    onClick={(e) => {
                      e.preventDefault();
                      if (connector) {
                        connect({ connector });
                        setWalletSelectedToConnect(connector.name);
                      } else {
                        window.open(wallet.url, "_blank");
                      }
                    }}
                  >
                    {Icon && <Icon className="w-7" />}
                    <div className="text-left flex justify-between w-full items-center ">
                      <div>
                        {wallet.name}
                        {wallet.name === "MetaMask" && !error && (
                          <div className="text-paragraph dark:text-paragraph-dark text-sm">
                            Recommended
                          </div>
                        )}
                        {error && error.name === wallet.name && (
                          <div className="text-error-container dark:text-error-container-dark">
                            {error.error}
                          </div>
                        )}
                      </div>
                      {connector && !isConnecting && "Detected"}
                      {isConnecting &&
                        walletSelectedToConnect === wallet.name &&
                        !error && <Spinner />}
                      {isConnected && <p>connected</p>}

                      {error && error.name === wallet.name && (
                        <div className="text-error-container dark:text-error-container-dark">
                          X
                        </div>
                      )}
                    </div>
                  </Menu.Item>
                );
              })}
              <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
                <Menu.Item
                  className="pt-3 pb-2 px-3 flex items-center justify-between w-full"
                  as="button"
                  onClick={(e) => {
                    e.preventDefault();
                    otherWalletsModal.setIsOpen(true, {}, true);
                    close();
                  }}
                >
                  Other wallets
                  <div>{`>`}</div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
