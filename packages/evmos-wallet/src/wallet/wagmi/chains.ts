import {
  evmos as wagmiEvmos,
  // evmosTestnet as wagmiEvmosTestnet,
} from "wagmi/chains";
import { Chain } from "viem";

import { evmoslocal as registryEvmos } from "@evmosapps/registry";
// import { getEnableTestnet } from "ui-helpers";

export const evmos: Chain & {
  cosmosId: string;
} = {
  ...wagmiEvmos,
  id: parseInt(registryEvmos.cosmosId.split(/[-_]/)[1]),
  cosmosId: registryEvmos.cosmosId,
  contracts: {
    multicall3: {
      address: "0x89F3a75bAEd526dCE06c72774dD7867D16e4caB7", //"0xca11bde05977b3631167028862be2a173976ca11",
    },
  },
  rpcUrls: {
    default: { http: registryEvmos.evmRest! },
    public: { http: registryEvmos.evmRest! },
  },
};
console.log(evmos);
// export const evmosTestnet: Chain & {
//   cosmosId: string;
// } = {
//   ...wagmiEvmosTestnet,
//   cosmosId: "evmos_9000-4",
//   contracts: {
//     multicall3: {
//       address: "0xca11bde05977b3631167028862be2a173976ca11",
//     },
//   },
// };

export function getEvmosChainInfo(): Chain & { cosmosId: string } {
  return evmos;
}
