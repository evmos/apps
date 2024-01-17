"use server";

import { raise } from "helpers";

import { fetchChains } from "../../chains/queries/server";
import { TokenEntity } from "@evmosapps/registry/autogen/token-entity";
import { fetchChainRegistryDir } from "../../utils/fetch-chain-registry-dir";
import { loadRegistryTokenExtensions } from "../../utils/load-registry-token-extensions";
import { ChainType } from "@evmosapps/registry/src/types";
import { nextCache } from "helpers/src/next/cache";
import { seconds } from "helpers/src/time";

export const fetchTokens = nextCache(
  async function () {
    const [chainMap, fromRegistry, fromExtensions] = await Promise.all([
      fetchChains().then((chains) => new Map(chains.map((c) => [c.ref, c]))),
      fetchChainRegistryDir<TokenEntity>("tokens"),
      loadRegistryTokenExtensions(),
    ]);

    const tokens = [...fromRegistry, ...fromExtensions].map((token) => {
      const source = token.ibc?.source ?? raise("Token source not found");

      const chain = chainMap.get(source) ?? raise(`Chain ${source} not found`);
      const networkType: ChainType = chain.configurationType;

      return {
        ...token,
        source,
        networkType,
        isMainnet: networkType === "mainnet",
        exponent: parseInt(token.exponent),
        chain: {
          name: chain.chainName,
          id: chain.chainId,
          source: chain.ref,
        },
      };
    });

    return tokens;
  },
  ["fetchTokens"],
  {
    revalidate: seconds("1d"),
  }
);