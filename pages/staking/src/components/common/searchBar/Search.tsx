// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { SearchIcon } from "@evmosapps/icons/SearchIcon";
import { CLICK_SEARCH_VALIDATORS_INPUT } from "tracker";
import { useSearchContext, SearchContext } from "../../context/SearchContext";
import { TrackerEvent } from "@evmosapps/ui-helpers";

const Search = ({ placeholder }: { placeholder: string }) => {
  const { value, handleSetValue } = useSearchContext() as SearchContext;

  return (
    <div className=" flex items-center justify-between rounded-lg border border-darkGray3 px-4 font-medium">
      <TrackerEvent event={CLICK_SEARCH_VALIDATORS_INPUT}>
        <input
          onChange={handleSetValue}
          value={value}
          className="w-full text-sm bg-transparent text-pearl placeholder:text-darkGray3 focus-visible:outline-none"
          placeholder={placeholder}
        />
      </TrackerEvent>
      <SearchIcon className="h-8 w-8 text-darkGray3" />
    </div>
  );
};

export default Search;
