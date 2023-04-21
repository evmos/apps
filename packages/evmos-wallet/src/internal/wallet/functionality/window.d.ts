// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Window as KeplrWindow } from "@keplr-wallet/types";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface MMWindow {
    ethereum?: MetaMaskInpageProvider;
  }

  // eslint-disable-next-line no-unused-vars
  interface Window extends KeplrWindow, MMWindow {
    // TODO: define cosmostation and coinbase extensions
    cosmostation: object;
    coinbaseWalletExtension: object;
  }
}
