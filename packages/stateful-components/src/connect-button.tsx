// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ConnectModalTrigger } from "./modals/ConnectModal/ConnectModal";
import { CLICK_CONNECT_WALLET_BUTTON, sendEvent } from "tracker";
import { Button } from "../../../packages/ui/src/button";

export const ConnectButton = () => {
  return (
    <ConnectModalTrigger>
      <Button
        variant={"primary"}
        size="md"
        data-testid="open-connect-modal"
        onClick={() => {
          sendEvent(CLICK_CONNECT_WALLET_BUTTON);
        }}
      >
        Sign in
      </Button>
    </ConnectModalTrigger>
  );
};
