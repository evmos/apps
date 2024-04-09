"use client";

import { Menu } from "@headlessui/react";
import { Button } from "../../../../../../packages/ui/src/button/index";
import { ProvidersIcons } from "stateful-components/src/providerIcons";
import Image from "next/image";

import { useSignIn } from "./useSignIn";
import { useOtherWalletsModal } from "./OtherWalletsModal";
import { useWallet } from "@evmosapps/evmos-wallet";
import { SignOut } from "./SignOut";
import { supportedWallets } from "./supportedWallets";
import { useState } from "react";

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

  const isMetamaskInstalled = () => {
    return "rainbow" in window;
  };

  // const useInstallMetamask = () => {
  //   const [status, setStatus] = useState<
  //     "not-installed" | "started-install" | "installed"
  //   >(isMetamaskInstalled() ? "installed" : "not-installed");

  //   useEffect(() => {
  //     if (status !== "started-install") return;
  //     const handleFocus = () => {
  //       const isInstalled = isMetamaskInstalled();

  //       if (isInstalled) {
  //         setStatus("installed");
  //         // sendEvent(SUCCESSFUL_WALLET_INSTALLATION_COPILOT, {
  //         //   "Wallet Provider": "MetaMask",
  //         // });
  //         return;
  //       }
  //       // for chrome and brave we need to reload the page to know if the user has Metamask installed
  //       window.location.reload();
  //     };
  //     window.addEventListener("focus", handleFocus);

  //     return () => {
  //       window.removeEventListener("focus", handleFocus);
  //     };
  //   }, [status]);
  //   return [status, setStatus] as const;
  // };

  const [walletSelectedToConnect, setWalletSelectedToConnect] = useState("");

  // const [metamaskStatus, setMetamaskStatus] = useInstallMetamask();
  // el isConnectiong puedo poner el loader pero en el caso especifico de la wallet no que me desaparezca todo el dropdown
  if (isHydrating || isReconnecting) {
    return (
      <div className="animate-pulse text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold w-28 h-full">
        &nbsp;
      </div>
    );
  }
  if (address && connector) {
    return <SignOut connector={connector} address={address} />;
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
              // static={metamaskStatus !== "installed" ? true : false}
              className="space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3"
            >
              <Menu.Item as="div" className="text-center">
                Sign in with wallet
              </Menu.Item>
              {/* loader */}
              {isLoading && <div>Loading!</div>}
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
                              // setMetamaskStatus("started-install");
                              // we should reuse the same logic that we have for installing MM
                              // here, to reload the page -
                            } else {
                              connect({
                                connector,
                              });
                              setWalletSelectedToConnect(connector.name);
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
                              {connector.name === "MetaMask" && (
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
                            {isWalletInstalled(connector.name) ? (
                              <div className="text-paragraph dark:text-paragraph-dark text-sm">
                                Detected
                              </div>
                            ) : (
                              ""
                            )}
                            {isConnecting &&
                              walletSelectedToConnect === connector.name && (
                                //    add icon with className="animate-spin"
                                <p>Loading</p>
                              )}
                            {isConnected && <p>connected</p>}
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
