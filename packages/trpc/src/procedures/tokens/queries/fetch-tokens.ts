// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { raise } from "helpers";

import { fetchChains } from "../../chains/queries/fetch-chains";

import { loadRegistryTokenExtensions } from "../../utils/load-registry-token-extensions";
import { ChainType } from "@evmosapps/registry/src/types";
import { nextCache } from "helpers/src/next/cache";
import { seconds } from "helpers/src/time";

import { TokenEntity } from "@evmosapps/registry/autogen/token-entity";
import { fetchChainRegistryDir } from "../../utils/fetch-chain-registry-dir";

const CHAIN_REGISTRY_REF = process.env.CHAIN_REGISTRY_REF ?? "main";
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
      if (CHAIN_REGISTRY_REF !== "main") {
        token = {
          ...token,
          img: token.img
            ? {
                png: token.img.png.replace("/main/", `/${CHAIN_REGISTRY_REF}/`),
                svg:
                  token.img.svg?.replace("/main/", `/${CHAIN_REGISTRY_REF}/`) ??
                  token.img.svg,
              }
            : {png: "", svg: ""},
        };
      }
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
  },
);
