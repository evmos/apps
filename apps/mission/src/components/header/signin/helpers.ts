// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { supportedWallets } from "./supportedWallets";

export const getIcon = (name: string) => {
  return supportedWallets.find((wallet) => wallet.name === name)?.icon;
};
