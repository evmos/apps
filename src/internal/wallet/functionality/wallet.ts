import { ResultMessage } from "./errors";

export const METAMASK_KEY = "metamask";

export interface WalletExtension {
  active: boolean;
  extensionName: string;
  addressEthFormat: string;
  addressCosmosFormat: string;
  evmosPubkey: string | undefined;
  cosmosPubkey: string | undefined;
  connect: () => Promise<ResultMessage>;
  disconnect: () => ResultMessage;
  // TODO: add signing method
}
