"use client";

import { Menu } from "@headlessui/react";
import { Button } from "../../../../../../packages/ui/src/button/index";
import { ProvidersIcons } from "stateful-components/src/providerIcons";
import Image from "next/image";

import { useSignIn } from "./useSignIn";
import { useOtherWalletsModal } from "./OtherWalletsModal";
import { useWallet } from "@evmosapps/evmos-wallet";
import { Profile } from "./Profile";
import { supportedWallets } from "./supportedWallets";
import { useState } from "react";
import { useInstallProvider } from "./useWalletInstalled";
import { Spinner } from "./Spinner";

export const SignIn = () => {
  const { data, connect, isLoading, error, defaultProviders } = useSignIn();
  const {
    connector,
    address,
    isHydrating,
    isConnecting,
    isReconnecting,
    isConnected,
  } = useWallet();

  const otherWalletsModal = useOtherWalletsModal();
  const isWalletInstalled = (name: string) => {
    const wallets = data ?? [];
    return wallets.find(
      (item) => item.name === name && item.installed === true,
    );
  };

  const [walletSelectedToConnect, setWalletSelectedToConnect] = useState("");

  const [providerStatus, setProviderStatus] = useInstallProvider(
    walletSelectedToConnect,
  );

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
        {({ open, close }) => (
          <>
            <Menu.Button>
              <Button as="div" outlined={open}>
                Sign in
              </Button>
            </Menu.Button>

            <Menu.Items
              // TODO Mili: we should have a prop to make the menu static (add it in localstorage or manage it somehow)

              className="space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3"
            >
              <Menu.Item as="div" className="text-center">
                Sign in with wallet
              </Menu.Item>
              {/* loader */}
              {isLoading && <Spinner />}
              {!isLoading && (
                <>
                  <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
                    {defaultProviders().map((connector) => {
                      const Icon = ProvidersIcons[connector.name];

                      return (
                        <Menu.Item
                          as="button"
                          className="flex w-full items-center border-b border-b-surface-container-high dark:border-b-surface-container-high-dark pt-3 pb-2 px-3 gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 focus:ring-1 focus:ring-tertiary-container focus:dark:ring-tertiary-container-dark"
                          key={connector.uid}
                          data-testid={`connect-with-${connector.name}`}
                          onClick={(e) => {
                            e.preventDefault();
                            //   sendEvent(CLICK_CONNECTED_WITH, {
                            //     "Wallet Provider": connector.name,
                            //   });

                            if (!isWalletInstalled(connector.name)) {
                              const web = supportedWallets.find(
                                (item) => item.name === connector.name,
                              );
                              window.open(web?.url, "_blank");
                              setProviderStatus("started-install");

                              // we should reuse the same logic that we have for installing MM
                              // here, to reload the page -
                            } else {
                              connect({
                                connector,
                              });
                              setWalletSelectedToConnect(connector.id);
                            }
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
                          <div className="text-left flex justify-between w-full items-center ">
                            <div>
                              <span>{connector.name}</span>
                              {connector.name === "MetaMask" && !error && (
                                <div className="text-paragraph dark:text-paragraph-dark text-sm">
                                  Recommended
                                </div>
                              )}

                              {error && error.name === connector.name && (
                                <div className="text-error-container dark:text-error-container-dark">
                                  {error.error}
                                </div>
                              )}
                            </div>
                            {isWalletInstalled(connector.name) &&
                              !isConnecting &&
                              (!error ||
                                (error && error.name !== connector.name)) && (
                                <div className="text-paragraph dark:text-paragraph-dark text-sm">
                                  Detected
                                  {/* spinner - move to ui / icon  */}
                                </div>
                              )}
                            {isConnecting &&
                              walletSelectedToConnect === connector.id &&
                              !error && (
                                //      {/* spinner - move to ui / icon  */}
                                <Spinner />
                              )}
                            {isConnected && <p>connected</p>}

                            {error && error.name === connector.name && (
                              <div className="text-error-container dark:text-error-container-dark">
                                X
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
                        close();
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
