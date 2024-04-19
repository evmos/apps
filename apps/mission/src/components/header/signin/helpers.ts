import { supportedWallets } from "./supportedWallets";

export const getIcon = (name: string) => {
  return supportedWallets.find((wallet) => wallet.name === name)?.icon;
};
