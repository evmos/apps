// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { formatFiat } from "helpers/src/format/format-fiat";
import { nextCache } from "helpers/src/next/cache";
import { seconds } from "helpers/src/time";
import { z } from "zod";
import { fetchTokens } from "../fetch-tokens";
import { devMemo } from "helpers/src/dev/dev-memo";
import { isNumber } from "lodash";

const revalidate = seconds("5m");

type CoingeckoTokenPriceResponse<C extends string> = {
  [x in C | `${C}_24h_change` | "last_updated_at"]?: number;
};
type CoingeckoResponse<T extends string, C extends string> = string extends T
  ? Record<string, CoingeckoTokenPriceResponse<C>>
  : {
    [K in T]: CoingeckoTokenPriceResponse<C>;
  };

const fetchCoinGeckoTokenPrices = devMemo(
  async function <const T extends string, const C extends string>(
    coingeckoIds: T[],
    currencies?: C[],
  ) {
    const url = new URL("https://api.coingecko.com/api/v3/simple/price");
    url.searchParams.set("include_24hr_change", "true");
    url.searchParams.set("include_last_updated_at", "true");
    url.searchParams.set("vs_currencies", currencies?.join(",") ?? "usd");

    url.searchParams.set("ids", coingeckoIds.join(","));

    return (await fetch(url, {
      next: {
        revalidate,
        tags: ["coingecko-token-prices"],
      },
    })
      .then((res) => res.json() as Promise<unknown>)
      .then((tokenPrices) => tokenPrices)) as Promise<CoingeckoResponse<T, C>>;
  },
  {
    tags: ["fetchCoinGeckoTokenPrices"],
    revalidate,
  },
);

const fetchStevmosRedemptionRate = devMemo(
  async () => {
    const resp = await fetch(
      "https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone/evmos_9001-2",
      {
        next: {
          revalidate,
          tags: ["stride-redemption-rate"],
        },
      },
    ).then((res) => res.json() as Promise<unknown>);
    return z
      .object({
        host_zone: z.object({
          redemption_rate: z.coerce.number(),
        }),
      })
      .transform((data) => data.host_zone.redemption_rate)
      .parse(resp);
  },
  {
    tags: ["fetchStevmosRedemptionRate"],
    revalidate,
  },
);
export const fetchTokenPrices = nextCache(
  async () => {
    const tokens = await fetchTokens();

    const coingeckoIds = [
      ...tokens.reduce((acc, token) => {
        if (token.coingeckoId) acc.add(token.coingeckoId);
        return acc;
      }, new Set<string>()),
    ];

    const coingeckoPrices = await fetchCoinGeckoTokenPrices(coingeckoIds, [
      "usd",
    ]);

    const prices = Object.entries(coingeckoPrices).reduce<
      {
        usd: {
          price: number;
          priceChange: number;
          formattedPrice: string;
          formattedPriceChange: string;
        };
        lastUpdatedAt: string;
        coingeckoId: string;
        coinDenoms: string[];
      }[]
    >((acc, [coingeckoId, { usd, usd_24h_change, last_updated_at }]) => {
      if (
        !isNumber(usd) ||
        !isNumber(usd_24h_change) ||
        !isNumber(last_updated_at)
      ) {
        return acc;
      }

      acc.push({
        usd: {
          price: usd,
          priceChange: usd_24h_change,
          formattedPrice: formatFiat(usd),
          formattedPriceChange: `${usd_24h_change.toFixed(2)}%`,
        },
        lastUpdatedAt: new Date(last_updated_at * 1000).toISOString(),
        coingeckoId,
        coinDenoms: tokens
          .filter((token) => token.coingeckoId === coingeckoId)
          .map((token) => token.coinDenom),
      });

      return acc;
    }, []);

    const evmos = prices.find((price) => price.coinDenoms.includes("EVMOS"));
    if (evmos) {
      const stevmosRedemptionRate = await fetchStevmosRedemptionRate();

      prices.push({
        ...evmos,

        coinDenoms: ["stEVMOS"],
        coingeckoId: "stride-staked-evmos",
        usd: {
          ...evmos.usd,
          price: evmos.usd.price / stevmosRedemptionRate,
          formattedPrice: formatFiat(evmos.usd.price / stevmosRedemptionRate),
        },
      });
    }

    return prices;
  },
  ["fetchTokenPrices"],
  {
    revalidate,
  },
);
