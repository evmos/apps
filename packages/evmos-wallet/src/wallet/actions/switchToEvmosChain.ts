import { switchChain } from "wagmi/actions";
import { wagmiConfig } from "..";
import { getConnectedChainId } from "./getConnectedChainId";
import { getEvmosChainInfo } from "../wagmi/chains";

const evmos = getEvmosChainInfo();
export const switchToEvmosChain = async () => {
  const connectedChainId = await getConnectedChainId();
  if (connectedChainId !== evmos.id) {
    return switchChain(wagmiConfig, {
      chainId: evmos.id,
    });
  }
};
