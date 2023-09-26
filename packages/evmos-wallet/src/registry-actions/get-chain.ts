import { chains } from "@evmosapps/registry";
import { Prefixish, normalizeToPrefix } from "./utils/normalize-to-prefix";
import { getEnableTestnet } from "ui-helpers";
import { Chain } from "./types";

const CHAIN_BY_PREFIX = Object.fromEntries(
  Object.values(chains)
    .filter(({ env }) => env === "mainnet")
    .map((chain) => [chain.prefix, chain])
);

const TESTNET_CHAIN_BY_PREFIX = Object.fromEntries(
  Object.values(chains)
    .filter(({ env }) => env === "testnet")
    .map((chain) => [chain.prefix, chain])
);

export const getChains = (): Chain[] => {
  if (getEnableTestnet()) {
    return Object.values({ ...CHAIN_BY_PREFIX, ...TESTNET_CHAIN_BY_PREFIX });
  }
  return Object.values(CHAIN_BY_PREFIX);
};
export const getChain = (prefixish: Prefixish) => {
  const prefix = normalizeToPrefix(prefixish);
  if (getEnableTestnet() && TESTNET_CHAIN_BY_PREFIX[prefix]) {
    return TESTNET_CHAIN_BY_PREFIX[prefix];
  }
  return CHAIN_BY_PREFIX[normalizeToPrefix(prefixish)];
};
