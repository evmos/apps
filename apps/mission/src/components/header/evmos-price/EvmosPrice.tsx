// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { EvmosRedIcon } from "@evmosapps/icons/EvmosRedIcon";
import { cn } from "helpers";
import { ErrorBoundary } from "react-error-boundary";

import { LazyPriceDisplay } from "./LazyPriceDisplay";

export const EvmosPrice = () => {
  return (
    <ErrorBoundary fallback={null}>
      <div className="text-pearl bg-darGray800 cursor-default items-center justify-center gap-3 rounded-full px-4 py-2 font-bold flex lg:mr-8">
        <EvmosRedIcon width={"1em"} height={"1em"} />

        <div className={cn("flex gap-3 items-center")}>
          <LazyPriceDisplay />
        </div>
      </div>
    </ErrorBoundary>
  );
};
