"use client";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { CopyIcon } from "@evmosapps/icons/CopyIcon";
import { AddressDisplay, Tooltip } from "@evmosapps/ui-helpers";
import { Menu } from "@headlessui/react";

import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { isCosmosBasedWallet } from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { Suspense, useEffect, useState } from "react";

import { ProvidersIcons } from "stateful-components/src/providerIcons";
import { Connector, useAccount, useDisconnect } from "wagmi";
import { TotalEvmos, TotalUsd } from "./useEvmosBalance";
import { Settings } from "./Settings";
import { SignIn2 } from "./SignIn2";

export const Profile = ({ connector }: { connector: Connector }) => {
  const { address } = useAccount();
  const CopyButton = ({ text }: { text: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
      if (!isCopied) return;
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }, [isCopied]);

    return (
      <button
        className="text-xs font-normal"
        onClick={async (e) => {
          e.preventDefault();
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
        }}
      >
        <Tooltip
          element={<CopyIcon width={14} height={14} />}
          text={isCopied ? "Copied!" : "Copy"}
        />
      </button>
    );
  };
  // TODO Mili: use the icon that is in supportWallets
  const Icon = ProvidersIcons[connector.name];
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        // setIsOpen(false);
      },
    },
  });

  const [dropdownStatus, setDropdownStatus] = useState("sign-in");
  console.log(dropdownStatus);
  if (connector && dropdownStatus === "settings") {
    return (
      <Settings connector={connector} setDropdownStatus={setDropdownStatus} />
    );
  }

  // if (connector && dropdownStatus === "change-wallet") {
  //   return <SignIn2 />;
  // }

  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button>
              <button
                className="text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold"
                data-testid={`wallet-profile-button wallet-profile-button-${getActiveProviderKey()}`}
              >
                {Icon && <Icon width="1.4em" height="1.4em" />}

                <span className="font-bold whitespace-nowrap">
                  {address && (
                    <AddressDisplay
                      address={
                        isCosmosBasedWallet(connector.name)
                          ? normalizeToCosmos(address)
                          : normalizeToEth(address)
                      }
                    />
                  )}
                </span>
              </button>
            </Menu.Button>

            <Menu.Items
              // TODO Mili: we should have a prop to make the menu static (add it in localstorage or manage it somehow)

              className="text-center justify-center items-center space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3"
            >
              <Menu.Item
                as="button"
                className="text-center"
                onClick={(e) => {
                  e.preventDefault();
                  // setDropdownStatus("change-wallet");
                  // otherWalletsModal.setIsOpen(true, {}, true);
                  // close();
                }}
              >
                {Icon && <Icon width="1.4em" height="1.4em" />} Wallet{" "}
                {connector.name}
              </Menu.Item>

              <Menu.Item as="div">
                <AddressDisplay address={address} />{" "}
                {address && <CopyButton text={address} />}
              </Menu.Item>
              <h6 className="">
                <Suspense
                  fallback={
                    <span className="bg-white/5 w-16 h-[0.8lh] animate-pulse rounded-lg "></span>
                  }
                >
                  {address && <TotalEvmos address={address} />}
                </Suspense>
                {!address && "-"}
                <span className="">EVMOS</span>
              </h6>
              <p className="">
                {!address && "-"}
                <Suspense
                  fallback={
                    <span className="bg-white/5 w-16 h-[0.8lh] animate-pulse rounded-lg "></span>
                  }
                >
                  {address && <TotalUsd address={address} />}
                </Suspense>
              </p>

              <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
                <Menu.Item
                  className="pt-3 pb-2 px-3 flex items-center justify-between w-full"
                  as="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownStatus("settings");
                    // otherWalletsModal.setIsOpen(true, {}, true);
                    // close();
                  }}
                >
                  Settings
                  <div>{`>`}</div>
                </Menu.Item>
              </div>
              <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2">
                <Menu.Item
                  className="pt-3 pb-2 px-3 flex items-center justify-between w-full"
                  as="button"
                  onClick={() => {
                    disconnect();
                    // sendEvent(CLICK_DISCONNECT_WALLET_BUTTON);
                  }}
                >
                  Sign out
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
