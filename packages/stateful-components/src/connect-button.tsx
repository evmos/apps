// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PrimaryButton } from "@evmosapps/ui-helpers";
import { cn } from "helpers";
import { CLICK_CONNECT_WALLET_BUTTON, sendEvent } from "tracker";
import { useWallet } from "@evmosapps/evmos-wallet";

export const ConnectButton = () => {
  const { isOpen, setIsOpen } = useWallet();

  return (
    <PrimaryButton
      variant={"primary"}
      disabled={isOpen}
      data-testid="open-connect-modal"
      className={cn("rounded-full px-8 py-2 text-sm font-bold")}
      onClick={() => {
        setIsOpen(true);
        sendEvent(CLICK_CONNECT_WALLET_BUTTON);
      }}
    >
      Connect
    </PrimaryButton>
  );
};
