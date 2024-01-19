// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useOsmosisData } from "./useOsmosisData";
import { useQuery } from "@tanstack/react-query";
import { parseUnits } from "viem";
import { sleep } from "helpers/src/sleep";

type OsmosisQouteResponse = {
  price_impact: number;
  return_amount: number;
  input_amount: number;
};

export function useOsmosisQuote({
  tokenA,
  tokenB,
  amount,
}: {
  tokenA: string;
  tokenB: string;
  amount: string;
}) {
  const { data } = useOsmosisData();

  const { data: quote, ...rest } = useQuery({
    queryKey: ["qoute", tokenA, tokenB, amount],

    queryFn: async ({ signal }) => {
      if (!data) {
        throw new Error("No data");
      }

      await sleep(300);
      if (signal.aborted) {
        // debounced
        throw new Error("Aborted");
      }
      if (amount === "0") {
        return {
          price_impact: 0,
          return_amount: 0,
          input_amount: 1,
        };
      }
      const url = new URL("https://api.multichain.tfm.com/route");

      const [tokenAInfo, tokenBInfo] =
        tokenA === "EVMOS"
          ? ([data.evmos, data.osmosis] as const)
          : ([data.osmosis, data.evmos] as const);
      url.searchParams.append("chain0", "osmosis-1");
      url.searchParams.append("chain1", "osmosis-1");
      url.searchParams.append("token0", tokenAInfo.osmosisDenom);
      url.searchParams.append("token1", tokenBInfo.osmosisDenom);
      url.searchParams.append(
        "amount",
        parseUnits(amount || "1", tokenAInfo.exponent).toString()
      );
      url.searchParams.append("exchange_specific_results", "true");

      return fetch(url, {
        signal,
      }).then(async (res) => res.json() as Promise<OsmosisQouteResponse>);
    },
    enabled: !!data,
  });
  return {
    quote,

    ...rest,
  };
}
