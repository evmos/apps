"use server";
import { getTokens } from "@evmosapps/evmos-wallet/src/registry-actions/get-tokens";
import { cache } from "react";
import { z } from "zod";

export const fetchCoingeckoTokenPrices = cache(async (reference = "usd") => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${getTokens()
      .map(({ coingeckoId }) => coingeckoId)
      .filter(Boolean)
      .join(
        ","
      )}&vs_currencies=${reference}&include_24hr_change=true&include_last_updated_at=true`,
    {
      next: {
        revalidate: 15 * 60,
      },
    }
  );

  const data = (await response.json()) as unknown;

  return Object.fromEntries(
    Object.entries(
      z
        .record(
          z.object({
            usd: z.number().optional(),
            usd_24h_change: z.number().optional(),
            last_updated_at: z.number().optional(),
          })
        )
        .parse(data)
    )
      .filter(
        ([, { usd, last_updated_at, usd_24h_change }]) =>
          typeof usd === "number" &&
          typeof last_updated_at === "number" &&
          typeof usd_24h_change === "number"
      )
      .map(([key, { usd, last_updated_at, usd_24h_change }]) => [
        key,
        {
          usd,
          lastUpdatedAt: last_updated_at,
          usd24hChange: usd_24h_change,
        },
      ])
  );
});

export const fetchTokenPrice = cache(async (coingeckoId: string) => {
  const tokens = await fetchCoingeckoTokenPrices();
  return tokens[coingeckoId];
});
