"use client";

import { Menu } from "@headlessui/react";
import { Button } from "@evmosapps/ui/button/index";
import { useConnect } from "wagmi";
import { E } from "helpers";
import { WALLET_NOTIFICATIONS } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/errors";
import { ProvidersIcons } from "stateful-components/src/providerIcons";
import Image from "next/image";

import { getGlobalKeplrProvider } from "@evmosapps/evmos-wallet";
import { useState } from "react";
import { isCosmosBasedWallet } from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { getGlobalLeapProvider } from "@evmosapps/evmos-wallet/src/wallet/utils/leap/getLeapProvider";
import { useQuery } from "@tanstack/react-query";

const predefinedWallets = [
  "MetaMask",
  "Rainbow",
  "Coinbase Wallet",
  "Leap",
  "WalletConnect",
];

export const SignIn = () => {
  const [error, setError] = useState({ name: "", error: "" });
  const { connectors, connect } = useConnect({
    mutation: {
      onSuccess: (_, { connector }) => {
        console.log("connect with ", connector);
        // sendEvent(SUCCESSFUL_WALLET_CONNECTION, {
        //   "Wallet Provider": connector.name,
        // });
        // setIsOpen(false);
      },

      onError: (e, { connector }) => {
        // sendEvent(UNSUCCESSFUL_WALLET_CONNECTION, {
        //   "Wallet Provider": connector.name,
        //   "Error Message": `Failed to connect with ${connector.name}`,
        // });
        if (E.match.byPattern(e, /Connector not found/)) {
          setError({
            error: WALLET_NOTIFICATIONS.ExtensionNotFoundSubtext,
            name: connector.name,
          });

          return;
        }
        if (
          E.match.byCode(e, -32002) || // metamask
          // same message for Leap ?
          E.match.byMessage(e, "PROVIDER_NOT_AVAILABLE") // keplr
        ) {
          setError({
            error: WALLET_NOTIFICATIONS.AddressSubtext,
            name: connector.name,
          });

          return;
        }
        if (
          E.match.byCode(e, 4001) ||
          E.match.byPattern(e, /Connection request reset/) || // wallet connect
          E.match.byPattern(e, /Request rejected/) // keplr
        ) {
          setError({ error: "Connection Rejected", name: connector.name });

          return;
        }

        // Didn't find a match, so we'll just isOpen the error
        setError({
          error: WALLET_NOTIFICATIONS.ErrorTitle,
          name: connector.name,
        });
      },
    },
  });

  const connectionResponse = useQuery({
    queryKey: ["test"],
    queryFn: () => providersDetected(),
  });

  const webs = [{ name: "Rainbow", web: "https://rainbow.me/" }];

  const providersDetected = async () => {
    // Use Promise.all to wait for all promises in `temp` to resolve
    const connected = await Promise.all(
      connectors.map(async (connector) => {
        if (isCosmosBasedWallet(connector.name)) {
          if (connector.name === "Keplr" && getGlobalKeplrProvider() !== null) {
            return { name: connector.name, installed: true };
          }
          if (connector.name === "Leap" && getGlobalLeapProvider() !== null) {
            return { name: connector.name, installed: true };
          }
          return { name: connector.name, installed: false };
        } else {
          const connec = await connector.getProvider();

          return connec
            ? { name: connector.name, installed: true }
            : { name: connector.name, installed: false };
        }
      }),
    );

    return connected;
  };

  const isWalletInstalled = (name: string) => {
    const wallets = connectionResponse.data ?? [];
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
              {/* as title for example */}
              {/* add loader and don't show the other content */}
              {connectionResponse.isLoading && <div>Loading!!!!</div>}
              <Menu.Item as="div" className="text-center">
                Sign in with wallet
              </Menu.Item>

              <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
                {connectors
                  .filter((connector) => {
                    if (connector.id.startsWith("io.")) {
                      return false;
                    }
                    if (connector.name === "Safe") return false;
                    if (connector.id === "me.rainbow") return false;
                    if (!predefinedWallets.includes(connector.name)) {
                      return false;
                    }
                    return true;
                  })

                  .map((connector) => {
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
                          if (!isWalletInstalled(connector.name)) {
                            const web = webs.find(
                              (item) => item.name === connector.name,
                            );
                            window.open(web?.web, "_blank");
                          } else {
                            connect({
                              connector,
                            });
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
                <Menu.Item className="pt-3 pb-2 px-3" as="button">
                  Other wallets
                </Menu.Item>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
