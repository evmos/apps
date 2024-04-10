"use client";
import { getActiveProviderKey, useWallet } from "@evmosapps/evmos-wallet";
import { CopyIcon } from "@evmosapps/icons/CopyIcon";
import { AddressDisplay, Tooltip } from "@evmosapps/ui-helpers";
import { Menu } from "@headlessui/react";
import { cn } from "helpers";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { isCosmosBasedWallet } from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { useEffect, useState } from "react";
import { ProfileModalTrigger } from "stateful-components/src/modals/ProfileModal/ProfileModal";
import { ProvidersIcons } from "stateful-components/src/providerIcons";
import { Connector, useDisconnect } from "wagmi";

export const SignOut = ({
  connector,
  address,
}: {
  connector: Connector;
  address: string;
}) => {
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

  const Icon = ProvidersIcons[connector.name];
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        // setIsOpen(false);
      },
    },
  });
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

              className="space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3"
            >
              <Menu.Item as="div" className="text-center">
                {Icon && <Icon width="1.4em" height="1.4em" />} Wallet{" "}
                {connector.name}
              </Menu.Item>

              <Menu.Item as="div">
                <AddressDisplay address={address} />{" "}
                <CopyButton text={address} />
              </Menu.Item>
              <button
                className={cn(
                  "border-darkPearl text-base hover:bg-grayOpacity mt-3 w-full rounded border p-3 font-bold uppercase",
                )}
                onClick={() => {
                  disconnect();
                  // sendEvent(CLICK_DISCONNECT_WALLET_BUTTON);
                }}
              >
                Disconnect
              </button>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
    // <ProfileModalTrigger>
    //   <button
    //     className="text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold"
    //     data-testid={`wallet-profile-button wallet-profile-button-${getActiveProviderKey()}`}
    //   >
    //     {Icon && <Icon width="1.4em" height="1.4em" />}

    //     <span className="font-bold whitespace-nowrap">
    //       {address && (
    //         <AddressDisplay
    //           address={
    //             isCosmosBasedWallet(connector.name)
    //               ? normalizeToCosmos(address)
    //               : normalizeToEth(address)
    //           }
    //         />
    //       )}
    //     </span>
    //   </button>
    // </ProfileModalTrigger>
  );
};
