"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { SearchIcon } from "icons";
import { CLICK_SEARCH_VALIDATORS_INPUT, useTracker } from "tracker";
import { useSearchContext, SearchContext } from "../../context/SearchContext";

const Search = ({ placeholder }: { placeholder: string }) => {
  const { value, handleSetValue } = useSearchContext() as SearchContext;
  const { handlePreClickAction } = useTracker(CLICK_SEARCH_VALIDATORS_INPUT);
  return (
    <div className="flex items-center justify-between rounded-lg border border-darkGray3 px-4 font-medium">
      <input
        onChange={handleSetValue}
        value={value}
        className="w-full bg-transparent text-pearl placeholder:text-darkGray3 focus-visible:outline-none"
        placeholder={placeholder}
        onClick={() => {
          handlePreClickAction();
        }}
      />
      <SearchIcon className="h-10 w-10 text-darkGray3" />
    </div>
  );
};

export default Search;
