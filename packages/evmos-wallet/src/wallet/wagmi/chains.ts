import * as chains from "@wagmi/core/chains";
import { EVMOS_CHAIN } from "../../internal/wallet/functionality/networkConfig";

export const evmos = {
  ...chains.evmos,
  cosmosId: "evmos_9001-2",
};

export const evmosTestnet = {
  ...chains.evmosTestnet,
  cosmosId: "evmos_9000-4",
};

export function getEvmosChainInfo() {
  return EVMOS_CHAIN.chainId === evmos.id ? evmos : evmosTestnet;
}
