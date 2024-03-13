// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { PriceDownIcon } from "@evmosapps/icons/PriceDownIcon";
import { PriceUpIcon } from "@evmosapps/icons/PriceUpIcon";

import { assert } from "helpers";
import { trpc } from "@evmosapps/trpc/client";
import { ms } from "helpers/src/time";

export const PriceDisplay = () => {
  const [data] = trpc.token.price.byDenom.useSuspenseQuery("EVMOS", {
    staleTime: ms("5m"),
  });

  assert(data, "Token price not found");

  return (
    <>
      <span>{data.usd.formattedPrice}</span>

      <div className="flex items-center gap-1">
        {data.usd.priceChange >= 0 ? <PriceUpIcon /> : <PriceDownIcon />}
        <span
          className={
            data.usd.priceChange > 0 ? "text-[#31B886]" : "text-[#ED4E33]"
          }
        >
          {data.usd.formattedPriceChange}
        </span>
      </div>
    </>
  );
};
