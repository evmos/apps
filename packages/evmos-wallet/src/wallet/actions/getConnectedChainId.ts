import { getWalletClient } from "wagmi/actions";
import { wagmiConfig } from "..";

export const getConnectedChainId = () => {
  return getWalletClient(wagmiConfig).then((client) => client.getChainId());
};
