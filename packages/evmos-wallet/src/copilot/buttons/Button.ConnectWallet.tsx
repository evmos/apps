// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { useSearchParams } from "next/navigation";

import { Dispatch, SetStateAction } from "react";
import { CLICK_CONNECT_WALLET_BUTTON, useTracker } from "tracker";
import { PrimaryButton } from "@evmosapps/ui-helpers";

export const ButtonConnectWallet = ({
  setIsOpen,
  variant,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  variant: "primary" | "outline-primary" | "primary-lg";
}) => {
  const query = useSearchParams();

  const modalAction = query.get("action");
  const { sendEvent } = useTracker(CLICK_CONNECT_WALLET_BUTTON);

  return (
    <PrimaryButton
      variant={variant}
      onClick={() => {
        setIsOpen(true);

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
      className={cn("", {
        "w-full text-base md:text-lg":
          variant === "outline-primary" || variant === "primary-lg",
        "rounded-full px-10 py-2 font-bold ": variant === "primary",
      })}
    >
      Connect
    </PrimaryButton>
  );
};
