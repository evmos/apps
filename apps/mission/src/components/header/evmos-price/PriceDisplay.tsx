// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { PriceDownIcon } from "@evmosapps/icons/PriceDownIcon";
import { PriceUpIcon } from "@evmosapps/icons/PriceUpIcon";
import { IconEvmosCirc } from "@evmosapps/ui/icons/crypto/evmos-circ.tsx";
import { assert, cn } from "helpers";
import { trpc } from "@evmosapps/trpc/client";
import { ms } from "helpers/src/time";

export const PriceDisplay = () => {
  const [data] = trpc.token.price.byDenom.useSuspenseQuery("EVMOS", {
    staleTime: ms("5m"),
  });

  assert(data, "Token price not found");

  return (
    <div className="flex gap-x-3 text-sm items-center">
      <IconEvmosCirc className="w-5 h-5" />
      <span className="dark:text-heading-dark text-heading">
        {data.usd.formattedPrice}
      </span>
      <div className="flex items-center gap-1">
        {data.usd.priceChange >= 0 ? <PriceUpIcon /> : <PriceDownIcon />}
        <span
          className={cn(
            "text-xs",
            data.usd.priceChange > 0
              ? "text-success dark:text-success-dark"
              : "text-error dark:text-error-dark",
          )}
        >
          {data.usd.formattedPriceChange}
        </span>
      </div>
    </div>
  );
};
