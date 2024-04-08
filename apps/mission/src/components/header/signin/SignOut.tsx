"use client";
import { getActiveProviderKey, useWallet } from "@evmosapps/evmos-wallet";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { isCosmosBasedWallet } from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { ProfileModalTrigger } from "stateful-components/src/modals/ProfileModal/ProfileModal";
import { ProvidersIcons } from "stateful-components/src/providerIcons";

export const SignOut = () => {
  const { connector, address, isHydrating, isConnecting, isReconnecting } =
    useWallet();

  if (isHydrating || isConnecting || isReconnecting) {
    return (
      <div className="animate-pulse text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold w-28 h-full">
        &nbsp;
      </div>
    );
  }
  if (address && connector) {
    const Icon = ProvidersIcons[connector.name];

    return (
      <ProfileModalTrigger>
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
      </ProfileModalTrigger>
    );
  }
};
