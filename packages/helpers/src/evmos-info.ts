import { evmos as wagmiEvmos } from "wagmi/chains";
import { Chain, Hex } from "viem";
import { ENV_URL } from "./clients/cosmos";

export const evmosmainnet = {
  ...wagmiEvmos,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11" as Hex,
    },
  },
  rpcUrls: {
    default: { http: [`${ENV_URL}/api/eth-json-rpc/evmos`] },
    public: { http: [`${ENV_URL}/api/eth-json-rpc/evmos`] },
  },

  networkType: "mainnet",
  ref: "evmos" as const,
} satisfies Chain & Record<string, unknown>;
export const evmostestnet = {
  ...wagmiEvmos,
  id: 9000,

  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11" as Hex,
    },
  },
  rpcUrls: {
    default: { http: [`${ENV_URL}/api/eth-json-rpc/evmostestnet`] },
    public: { http: [`${ENV_URL}/api/eth-json-rpc/evmostestnet`] },
  },

  networkType: "testnet",
  ref: "evmostestnet" as const,
} satisfies Chain & Record<string, unknown>;

export const evmoslocalnet = {
  ...wagmiEvmos,
  id: 9002,
  contracts: {
    multicall3: {
      // eslint-disable-next-line no-secrets/no-secrets
      address: "0x89F3a75bAEd526dCE06c72774dD7867D16e4caB7" as Hex,
    },
  },
  rpcUrls: {
    default: { http: [`${ENV_URL}/api/eth-json-rpc/evmoslocalnet`] },
    public: { http: [`${ENV_URL}/api/eth-json-rpc/evmoslocalnet`] },
  },

  networkType: "localnet",
  ref: "evmoslocalnet" as const,
} satisfies Chain & Record<string, unknown>;

export const EVMOS_CONFIG_MAP = {
  evmos: evmosmainnet,
  evmostestnet,
  evmoslocalnet,
};