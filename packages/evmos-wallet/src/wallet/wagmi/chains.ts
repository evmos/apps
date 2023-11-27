"use client";
import { evmos as wagmiEvmos } from "wagmi/chains";
import { Chain } from "viem";

import { evmos, evmoslocal, evmostestnet } from "@evmosapps/registry";
import { getSelectedNetworkMode } from "@evmosapps/ui-helpers/src/getSelectedNetworkMode";
import { raise } from "helpers";
let registry: typeof evmos | typeof evmoslocal | typeof evmostestnet = evmos;
if (getSelectedNetworkMode() === "localtestnet") {
  registry = evmoslocal;
} else if (getSelectedNetworkMode() === "testnet") {
  registry = evmostestnet;
}

export const config: Chain & {
  cosmosId: string;
} = {
  ...wagmiEvmos,
  id: parseInt(registry.cosmosId.split(/[-_]/)[1] ?? raise("Invalid chain id")),
  cosmosId: registry.cosmosId,
  contracts: {
    multicall3: {
      address:
        getSelectedNetworkMode() === "localtestnet"
          ? // eslint-disable-next-line no-secrets/no-secrets
            "0x89F3a75bAEd526dCE06c72774dD7867D16e4caB7"
          : "0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
  rpcUrls: {
    default: { http: registry.evmRest },
    public: { http: registry.evmRest },
  },
};

export function getEvmosChainInfo(): Chain & { cosmosId: string } {
  return config;
}
