import * as chains from "wagmi/chains";
import type { Chain } from "wagmi/chains";
import { EVMOS_CHAIN } from "../../internal/wallet/functionality/networkConfig";

export const evmos = {
  ...chains.evmos,
  cosmosId: "evmos_9001-2",
};

export const evmosTestnet = {
  ...chains.evmosTestnet,
  cosmosId: "evmos_9000-4",
};

export function getEvmosChainInfo(): Chain & { cosmosId: string } {
  return EVMOS_CHAIN.chainId === evmos.id ? evmos : evmosTestnet;
}
