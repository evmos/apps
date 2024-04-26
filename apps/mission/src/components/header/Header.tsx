// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { EvmosPrice } from "./evmos-price/EvmosPrice";

export const Header = () => (
  <header
    className={cn(
      "hidden md:sticky top-0 h-16 px-14 py-3 md:flex items-center",
      "bg-background/80 dark:bg-background-dark/80 backdrop-blur z-10",
      "border-b dark:border-surface-container-lowest-dark border-surface-container-lowest",
    )}
  >
    <EvmosPrice />
  </header>
);
