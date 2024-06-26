// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { evmos as wagmiEvmos } from "wagmi/chains";
import { Chain, Hex } from "viem";
import { getPubUrl } from "./clients/get-pub-url";

export const evmosmainnet = {
  ...wagmiEvmos,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11" as Hex,
    },
  },
  rpcUrls: {
    default: { http: [`${getPubUrl()}/api/eth-json-rpc/evmos`] },
    public: { http: [`${getPubUrl()}/api/eth-json-rpc/evmos`] },
  },

  networkType: "mainnet",
  ref: "evmos" as const,
  cosmosChainId: "evmos_9001-2",
} satisfies Chain & Record<string, unknown>;

export const evmostestnet = {
  ...wagmiEvmos,
  name: "Evmos Testnet",
  id: 9000,

  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11" as Hex,
    },
  },
  rpcUrls: {
    default: { http: [`${getPubUrl()}/api/eth-json-rpc/evmostestnet`] },
    public: { http: [`${getPubUrl()}/api/eth-json-rpc/evmostestnet`] },
  },

  networkType: "testnet",
  ref: "evmostestnet" as const,
  cosmosChainId: "evmos_9000-4",
} satisfies Chain & Record<string, unknown>;

export const evmoslocalnet = {
  ...wagmiEvmos,
  name: "Evmos Localnet",
  id: 9002,
  contracts: {
    multicall3: {
      // eslint-disable-next-line no-secrets/no-secrets
      address: "0x89F3a75bAEd526dCE06c72774dD7867D16e4caB7" as Hex,
    },
  },
  rpcUrls: {
    default: { http: [`${getPubUrl()}/api/eth-json-rpc/evmoslocalnet`] },
    public: { http: [`${getPubUrl()}/api/eth-json-rpc/evmoslocalnet`] },
  },

  networkType: "localnet",
  ref: "evmoslocalnet" as const,
  cosmosChainId: "evmoslocal_9002-10",
} satisfies Chain & Record<string, unknown>;

export const EVMOS_CONFIG_MAP = {
  evmos: evmosmainnet,
  evmostestnet,
  evmoslocalnet,
};
