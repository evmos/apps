// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { TokenEntity } from "../autogen/token-entity";
import { loadRegistryTokenExtensions } from "./load-registry-token-extensions";
import { raise } from "helpers";
import { ChainType } from "./types";

import { fetchChainRegistryDirJsonFiles } from "./fetch-chain-registry-dir-json-files";

export async function fetchTokens() {
  const fromRegistry = fetchChainRegistryDirJsonFiles<TokenEntity>("tokens");

  const fromExtensions = loadRegistryTokenExtensions();
  const tokens = (await Promise.all([fromRegistry, fromExtensions]))
    .flatMap((x) => x)
    .map((token) => {
      const source = token.ibc?.source ?? raise("Token source not found");
      let networkType: ChainType = "mainnet";

      if (source.endsWith("testnet")) networkType = "testnet";
      if (source.endsWith("localnet")) networkType = "localnet";

      return {
        ...token,
        source,
        networkType,
        isMainnet: networkType === "mainnet",
        exponent: parseInt(token.exponent),
      };
    });

  return { tokens, dt: new Date().toISOString() };
}
