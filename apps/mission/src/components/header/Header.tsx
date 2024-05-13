// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { cn } from "helpers";
import { EvmosPrice } from "./evmos-price/EvmosPrice";
import { SignIn } from "./signin/SignIn";
import useWindowResize from "../useResize";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";
export const Header = () => {
  const { isDesktop } = useWindowResize();
  return (
    <header
      className={cn(
        "hidden md:sticky top-0 h-16 px-14 py-3 md:flex items-center justify-between w-full",
        "bg-background/80 dark:bg-background-dark/80 backdrop-blur z-30",
        "border-b dark:border-surface-container-lowest-dark border-surface-container-lowest gap-x-2",
      )}
    >
      <EvmosPrice />
      <IconButton
        ghost
        className="ml-auto"
        onClick={() => {
          window.dispatchEvent(new Event("open-search"));
        }}
      >
        <IconSearch />
      </IconButton>
      {isDesktop && <SignIn />}
    </header>
  );
};
