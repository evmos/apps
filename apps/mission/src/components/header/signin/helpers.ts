// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getGlobalKeplrProvider } from "@evmosapps/evmos-wallet";
import { supportedWallets } from "./supportedWallets";
import { getGlobalLeapProvider } from "@evmosapps/evmos-wallet/src/wallet/utils/leap/getLeapProvider";

export const getWalletByConnector = (name: string) => {
  return supportedWallets.find((wallet) => wallet.name === name);
};

export const isKeplrInstalled = () => {
  if (getGlobalKeplrProvider() === null) {
    return false;
  }
  return true;
};
export const isLeapInstalled = () => {
  if (getGlobalLeapProvider() === null) {
    return false;
  }
  return true;
};
