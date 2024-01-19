// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { EvmosRedIcon } from "@evmosapps/icons/EvmosRedIcon";
import { PriceDownIcon } from "@evmosapps/icons/PriceDownIcon";
import { PriceUpIcon } from "@evmosapps/icons/PriceUpIcon";
import { fetchTokenPriceByDenom } from "@evmosapps/evmos-wallet/src/server/fetch-token-price-by-denom.server";

import { cn, raise } from "helpers";
import { useQuery } from "@tanstack/react-query";
const formatFiat = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
export const EvmosPrice = () => {
  const { error, data, status } = useQuery({
    queryKey: ["apiFetchTokenPriceByDenom", "evmos"],
    refetchOnWindowFocus: true,
    queryFn: async () =>
      (await fetchTokenPriceByDenom("EVMOS")) ?? raise("Token Price Not Found"),
    refetchInterval: 1000 * 60 * 5,
  });

  if (error) return null;
  return (
    <div className="text-pearl bg-darGray800 cursor-default items-center justify-center gap-3 rounded-full px-4 py-2 font-bold flex lg:mr-8">
      <EvmosRedIcon width={"1em"} height={"1em"} />
      <div
        className={cn("flex gap-3 items-center", {
          "w-[13ch] h-[1lh] bg-gray2/20 rounded-md animate-pulse ":
            status === "pending",
        })}
      >
        {data && (
          <>
            <span>{formatFiat(data.usd.price)}</span>

            <div className="flex items-center gap-1">
              {data.usd.priceChange >= 0 ? <PriceUpIcon /> : <PriceDownIcon />}
              <span
                className={
                  data.usd.priceChange > 0 ? "text-[#31B886]" : "text-[#ED4E33]"
                }
              >
                {data.usd.priceChange.toFixed(2)}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
