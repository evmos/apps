import {
  evmos as wagmiEvmos,
  evmosTestnet as wagmiEvmosTestnet,
} from "wagmi/chains";
import { Chain } from "viem";
import { evmos as registryEvmos } from "@evmosapps/registry";
import { getEnableTestnet } from "ui-helpers";

export const evmos: Chain & {
  cosmosId: string;
} = {
  ...wagmiEvmos,
  cosmosId: "evmos_9001-2",
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
  rpcUrls: {
    default: { http: registryEvmos.evmRest },
    public: { http: registryEvmos.evmRest },
  },
};

export const evmosTestnet: Chain & {
  cosmosId: string;
} = {
  ...wagmiEvmosTestnet,
  cosmosId: "evmos_9000-4",
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
};

export function getEvmosChainInfo(): Chain & { cosmosId: string } {
  return getEnableTestnet() ? evmosTestnet : evmos;
}
