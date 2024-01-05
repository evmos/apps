"use server";
import { devModeCache } from "helpers/src/dev/dev-mode-cache";
import { ChainEntity } from "../autogen/chain-entity";
import { loadRegistryChainExtensions } from "./load-registry-chain-extensions";
import { unstable_cache as cache } from "next/cache";
import { fetchChainRegistryDirJsonFiles } from "./fetch-chain-registry-dir-json-files";

const revalidate = 3600;
export const _fetchChains = devModeCache(
  async function fetchChains() {
    const fromRegistry =
      fetchChainRegistryDirJsonFiles<ChainEntity>("chainConfig");
    const fromExtensions = loadRegistryChainExtensions();

    const all = (await Promise.all([fromRegistry, fromExtensions])).flatMap(
      (x) => x
    );
    const flattened = all.flatMap(({ configurations, ...chain }) =>
      configurations.map((configuration) => ({
        ...chain,
        ...configuration,
      }))
    );

    //  sanity check
    if (flattened.length !== new Set(flattened.map((x) => x.identifier)).size) {
      throw new Error("Duplicate chain identifiers");
    }
    return { chains: flattened, dt: new Date().toISOString() };
  },
  {
    cacheKey: "fetchChains",
    revalidate,
  }
);

export const fetchChains = cache(_fetchChains, ["fetchChains"], {
  revalidate,
});
