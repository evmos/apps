// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PrimaryButton } from "@evmosapps/ui-helpers";
import { cn } from "helpers";
import { CLICK_WIDGET, sendEvent } from "tracker";
import { useWallet } from "@evmosapps/evmos-wallet";

export const ConnectButton = () => {
  const { isDropdownOpen, setIsDropdownOpen } = useWallet();

  return (
    <PrimaryButton
      variant={"primary"}
      disabled={isDropdownOpen}
      data-testid="open-connect-modal"
      className={cn("rounded-full px-8 py-2 text-sm font-bold")}
      onClick={() => {
        setIsDropdownOpen(true);
        sendEvent(CLICK_WIDGET, { "dApp Details Type": "Sign in" });
      }}
    >
      Sign in
    </PrimaryButton>
  );
};
