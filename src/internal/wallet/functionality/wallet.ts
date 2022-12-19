export const METAMASK_KEY = "metamask";
export const KEPLR_KEY = "keplr";

export type WalletExtension = {
  active: boolean;
  extensionName: string;
  evmosAddressEthFormat: string;
  evmosAddressCosmosFormat: string;
  evmosPubkey: string | null;
  osmosisPubkey: string | null;
};
