// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";
import { isUndefined } from "helpers";
import { cachedFetch } from "helpers/src/dev/cached-fetch";

const revalidate = 5 * 60 * 1000; // 5 minutes

type CoingeckoTokenPriceResponse<C extends string> = {
  [x in C | `${C}_24h_change` | "last_updated_at"]?: number;
};
type CoingeckoResponse<T extends string, C extends string> = string extends T
  ? Record<string, CoingeckoTokenPriceResponse<C>>
  : {
      [K in T]: CoingeckoTokenPriceResponse<C>;
    };

const fetchCoinGeckoTokenPrices = async function <
  const T extends string,
  const C extends string,
>(coingeckoIds: T[], currencies?: C[]) {
  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  url.searchParams.set("include_24hr_change", "true");
  url.searchParams.set("include_last_updated_at", "true");
  url.searchParams.set("vs_currencies", currencies?.join(",") ?? "usd");

  url.searchParams.set("ids", coingeckoIds.join(","));

  return (await cachedFetch(url, {
    next: {
      revalidate,
      tags: ["coingecko-token-prices"],
    },
    devCache: {
      revalidate,
      tags: ["coingecko-token-prices"],
    },
  })
    .then((res) => res.json() as Promise<unknown>)
    .then((tokenPrices) => tokenPrices)) as Promise<CoingeckoResponse<T, C>>;
};

export const fetchTokenPrices = async () => {
  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  url.searchParams.set("include_24hr_change", "true");
  url.searchParams.set("include_last_updated_at", "true");
  url.searchParams.set("vs_currencies", "usd");
  const { tokens } = await fetchTokens();

  const coingeckoIds = [
    ...tokens.reduce((acc, token) => {
      if (token.coingeckoId) acc.add(token.coingeckoId);
      return acc;
    }, new Set<string>()),
  ];

  url.searchParams.set("ids", coingeckoIds.join(","));
  const coingeckoPrices = await fetchCoinGeckoTokenPrices(coingeckoIds, [
    "usd",
  ]);

  return Object.entries(coingeckoPrices).reduce<
    {
      usd: {
        price: number;
        priceChange: number;
      };
      lastUpdatedAt: string;
      coingeckoId: string;
      coinDenoms: string[];
    }[]
  >((acc, [coingeckoId, { usd, usd_24h_change, last_updated_at }]) => {
    if (
      isUndefined(usd) ||
      isUndefined(usd_24h_change) ||
      isUndefined(last_updated_at)
    ) {
      return acc;
    }

    acc.push({
      usd: {
        price: usd,
        priceChange: usd_24h_change,
      },
      lastUpdatedAt: new Date(last_updated_at * 1000).toISOString(),
      coingeckoId,
      coinDenoms: tokens
        .filter((token) => token.coingeckoId === coingeckoId)
        .map((token) => token.coinDenom),
    });
    return acc;
  }, []);
};
