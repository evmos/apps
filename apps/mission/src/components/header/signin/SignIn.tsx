"use client";

import { Menu } from "@headlessui/react";
import { Button } from "@evmosapps/ui/button/index";
import { ProvidersIcons } from "stateful-components/src/providerIcons";
import Image from "next/image";

import { useSignIn } from "./useSignIn";
import { useOtherWalletsModal } from "./OtherWalletsModal";

const predefinedWallets = [
  "MetaMask",
  "Rainbow",
  "Coinbase Wallet",
  "Leap",
  "WalletConnect",
];
// const webs = [
//   { name: "Rainbow", web: "https://rainbow.me/download" },
//   {
//     name: "Coinbase Wallet",
//     web: "https://www.coinbase.com/es-LA/wallet/downloads",
//   },
//   {
//     name: "MetaMask",
//     web: "https://metamask.io/download/",
//   },
//   { name: "Keplr", web: "https://www.keplr.app/download" },
// ];

export const SignIn = () => {
  const { data, connect, isLoading, error, defaultProviders, providers } =
    useSignIn();
  const otherWalletsModal = useOtherWalletsModal();
  const isWalletInstalled = (name: string) => {
    const wallets = data ?? [];
    return wallets.find(
      (item) => item.name === name && item.installed === true,
    );
  };

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
              {/* loader */}
              {isLoading && <div>Loading!</div>}
              {!isLoading && (
                <>
                  <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
                    {providers.map((connector) => {
                      const Icon = ProvidersIcons[connector.name];

                      return (
                        <Menu.Item
                          as="button"
                          className="flex items-center border-b border-b-surface-container-high dark:border-b-surface-container-high-dark pt-3 pb-2 px-3 gap-4"
                          key={connector.uid}
                          data-testid={`connect-with-${connector.name}`}
                          onClick={(e) => {
                            e.preventDefault();
                            //   sendEvent(CLICK_CONNECTED_WITH, {
                            //     "Wallet Provider": connector.name,
                            //   });
                            // if (!isWalletInstalled(connector.name)) {
                            //   const web = supportedWallets.find(
                            //     (item) => item.name === connector.name,
                            //   );
                            //   window.open(web?.url, "_blank");
                            //   // we should reuse the same logic that we have for installing MM
                            //   // here, to reload the page -
                            // } else {
                            connect({
                              connector,
                            });
                            // }
                          }}
                        >
                          {Icon && <Icon className="w-7" />}
                          {connector.icon && (
                            <Image
                              src={connector.icon}
                              alt={connector.name}
                              width={28}
                              height={28}
                            />
                          )}
                          <div className="text-left ">
                            <span>{connector.name}</span>
                            {connector.name === "MetaMask" && (
                              <div className="text-paragraph dark:text-paragraph-dark text-sm">
                                Recommended
                              </div>
                            )}
                            {/* TODO Mili: move to the right */}
                            {isWalletInstalled(connector.name) ? (
                              <div className="text-paragraph dark:text-paragraph-dark text-sm">
                                Detected
                              </div>
                            ) : (
                              ""
                            )}
                            {error && error.name === connector.name && (
                              <div className="text-error-container dark:text-error-container-dark">
                                {error.error}
                              </div>
                            )}
                          </div>
                        </Menu.Item>
                      );
                    })}
                  </div>

                  <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
                    <Menu.Item
                      className="pt-3 pb-2 px-3 flex items-center justify-between w-full"
                      as="button"
                      onClick={(e) => {
                        e.preventDefault();
                        otherWalletsModal.setIsOpen(true, {}, true);
                        // close();
                      }}
                    >
                      Other wallets
                      <div>{`>`}</div>
                    </Menu.Item>
                  </div>
                </>
              )}
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
