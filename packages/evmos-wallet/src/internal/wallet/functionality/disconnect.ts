// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch } from "react";
import { resetWallet } from "../../../wallet/redux/WalletSlice";
import { unsubscribeToKeplrEvents } from "./keplr/keplrHelpers";
import { unsubscribeToEvents } from "./metamask/metamaskHelpers";

export function disconnectWallets(
  dispatch: Dispatch<{
    payload: undefined;
    type: "walletSlice/resetWallet";
  }>
) {
  unsubscribeToEvents();
  unsubscribeToKeplrEvents();
  dispatch(resetWallet());
}
