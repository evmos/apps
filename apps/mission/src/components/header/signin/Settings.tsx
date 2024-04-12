"use client";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";

import { AddressDisplay } from "@evmosapps/ui-helpers";
import { Menu } from "@headlessui/react";

import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { isCosmosBasedWallet } from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { Dispatch, SetStateAction } from "react";

import { ProvidersIcons } from "stateful-components/src/providerIcons";
import { Connector, useAccount } from "wagmi";

export const Settings = ({
  connector,
  setDropdownStatus,
}: {
  connector: Connector;
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { address } = useAccount();

  // TODO Mili: use the icon that is in supportWallets
  const Icon = ProvidersIcons[connector.name];

  return (
    <div className="relative">
      <Menu>
        {({}) => (
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
              //   static={true}
              className="text-center justify-center items-center space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3"
            >
              <Menu.Item
                as="button"
                className="text-center"
                onClick={() => {
                  setDropdownStatus("sign-in");
                }}
              >
                Settings
              </Menu.Item>

              <div>
                name
                <span>Edit</span>
              </div>
              <p>Account</p>
              <div>
                Currency <span>USD</span>
              </div>
              <div>
                Language <span>English</span>
              </div>
              <div>
                Notifications <span>Coming Soon</span>
              </div>
              <div>
                Address Format <span>Coming Soon</span>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
