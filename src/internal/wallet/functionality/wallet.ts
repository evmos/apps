export const METAMASK_KEY = "metamask";
export const KEPLR_KEY = "keplr";
export const WALLECT_CONNECT_KEY = "walletconnect";

export type WalletExtension = {
  active: boolean;
  extensionName: string;
  evmosAddressEthFormat: string;
  evmosAddressCosmosFormat: string;
  evmosPubkey: string | null;
  osmosisPubkey: string | null;
};
