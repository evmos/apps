// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { chains } from "@evmosapps/registry";
import { normalizeToPrefix } from "./utils/normalize-to-prefix";
import { getSelectedNetworkMode } from "@evmosapps/ui-helpers/src/getSelectedNetworkMode";
import type { Chain } from "./types";
import { E } from "helpers";

const CHAIN_BY_PREFIX = Object.fromEntries(
  Object.values(chains)
    .filter(({ env }) => env === "mainnet")
    .map((chain) => [chain.prefix, chain]),
);

const TESTNET_CHAIN_BY_PREFIX = Object.fromEntries(
  Object.values(chains)
    .filter(({ env }) => env === "testnet")
    .map((chain) => [chain.prefix, chain]),
);

const LOCAL_TESTNET_CHAIN_BY_PREFIX = Object.fromEntries(
  Object.values(chains)
    .filter(({ env }) => env === "localtestnet")
    .map((chain) => [chain.prefix, chain]),
);

export const getChains = (): Chain[] => {
  if (getSelectedNetworkMode() === "testnet") {
    return Object.values({
      ...CHAIN_BY_PREFIX,
      ...TESTNET_CHAIN_BY_PREFIX,
    });
  }
  if (getSelectedNetworkMode() === "localtestnet") {
    return Object.values({
      ...CHAIN_BY_PREFIX,
      ...LOCAL_TESTNET_CHAIN_BY_PREFIX,
    });
  }
  return Object.values(CHAIN_BY_PREFIX);
};
export const getChain = (prefixish: string) => {
  const prefix = normalizeToPrefix(prefixish);
  return (
    getChains().find((chain) => chain.prefix === prefix) ??
    E.raise("Chain not found")
  );
};
