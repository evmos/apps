// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";
import { CLICK_SEARCH, sendEvent } from "tracker";

export const SearchButton = () => {
  return (
    <IconButton
      ghost
      className="ml-auto"
      onClick={() => {
        sendEvent(CLICK_SEARCH);
        window.dispatchEvent(new Event("open-search"));
      }}
    >
      <IconSearch />
    </IconButton>
  );
};
