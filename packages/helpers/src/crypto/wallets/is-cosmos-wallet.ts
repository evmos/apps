// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export enum COSMOS_BASED_WALLETS {
  Keplr = "Keplr",
  Leap = "Leap",
}

export const isCosmosBasedWallet = (wallet: string): boolean => {
  return wallet in COSMOS_BASED_WALLETS;
};
