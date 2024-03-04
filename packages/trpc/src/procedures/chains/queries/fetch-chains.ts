// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { nextCache } from "helpers/src/next/cache";
import { loadRegistryChainExtensions } from "../../utils/load-registry-chain-extensions";

import { seconds } from "helpers/src/time";

import { fetchRegistry } from "../../tokens/queries/fetchRegistry";

const EVMOS_OVERWRITES = {
  web3: [
    "https://evmos.lava.build",
    "https://evmos-json-rpc.stakely.io",
    "https://jsonrpc-evmos-ia.cosmosia.notional.ventures/",
    "https://jsonrpc.evmos.nodestake.top",
    "https://evmos-mainnet.public.blastapi.io",
    "https://evmos-evm.publicnode.com",
    "https://evmos-rpc.gateway.pokt.network",
    "https://jsonrpc-evmos.mms.team:443",
    "https://web3endpoints.com/evmos-mainnet",
    "https://evmos-json.antrixy.org",
  ],
  rest: [
    "https://rest.evmos.lava.build",
    "https://evmos-lcd.stakely.io",
    "https://api.evmos.nodestake.top",
    "https://api.evmos.silknodes.io",
    "https://evmos-rest.publicnode.com",
    "https://api-evmos.mms.team:443",
    "https://evmos-rest.antrixy.org",
  ],
};

export const fetchChains = nextCache(
  async function fetchChains() {
    const fromRegistry = fetchRegistry().then((registry) => registry.chains);

    const fromExtensions = loadRegistryChainExtensions();

    const all = (await Promise.all([fromRegistry, fromExtensions])).flatMap(
      (x) => x,
    );
    const flattened = all.flatMap(({ configurations, ...chain }) =>
      configurations.map(({ identifier, ...configuration }) => ({
        ...chain,
        ...configuration,
        ref: identifier,
        ...(identifier === "evmos" ? EVMOS_OVERWRITES : {}),
      })),
    );

    //  sanity check
    if (flattened.length !== new Set(flattened.map((x) => x.ref)).size) {
      throw new Error("Duplicate chain identifiers");
    }
    return flattened;
  },
  ["fetchChains"],
  {
    revalidate: seconds("1d"),
  },
);
