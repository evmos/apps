"use client";
import { useSearchParams } from "next/navigation";

import { CLICK_CONNECT_WALLET_BUTTON, useTracker } from "tracker";
import { AddressDisplay, PrimaryButton } from "@evmosapps/ui-helpers";
import { cn } from "helpers";
import {
  getActiveProviderKey,
  normalizeToEvmos,
} from "@evmosapps/evmos-wallet";
import { useAccount } from "wagmi";
import { useConnectModal } from "stateful-components/src/modals/ConnectModal/ConnectModal";
import { useProfileModal } from "stateful-components/src/modals/ProfileModal/ProfileModal";
import { ProvidersIcons } from "stateful-components/src/providerIcons";

export const ConnectModalButton = () => {
  const { isConnected, connector, address } = useAccount();
  const connectModal = useConnectModal();
  const profileModal = useProfileModal();
  const query = useSearchParams();
  const modalAction = query?.get("action");
  const { sendEvent } = useTracker();

  if (connector && isConnected && address) {
    const Icon = ProvidersIcons[connector.id];
    return (
      <button
        className="font-sm text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold"
        onClick={() => {
          profileModal.setIsOpen(true);
        }}
        data-testid={`wallet-profile-button wallet-profile-button-${getActiveProviderKey()}`}
      >
        {Icon && <Icon width="1.4em" height="1.4em" />}

        <span className="font-bold whitespace-nowrap">
          <AddressDisplay address={normalizeToEvmos(address)} />
        </span>
      </button>
    );
  }
  return (
    <PrimaryButton
      variant={"primary"}
      onClick={() => {
        connectModal.setIsOpen(true);

        let location = "dApp Store";
        if (modalAction) {
          if (modalAction === "transfer") {
            location = "send modal";
          } else if (modalAction === "pay") {
            location = "payment request modal";
          } else {
            location = "receive modal";
          }
        }
        sendEvent(CLICK_CONNECT_WALLET_BUTTON, {
          location,
        });
      }}
      data-testid="open-connect-modal"
      className={cn("rounded-full px-10 py-2 font-bold")}
    >
      Connect
    </PrimaryButton>
  );
};
