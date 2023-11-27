"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type SearchContext = {
  value: string;
  handleSetValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchContext = createContext<SearchContext | null>(null);

export function SearchWrapper({ children }: { children: JSX.Element }) {
  const [value, setValue] = useState("");

  const handleSetValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <SearchContext.Provider value={{ value, handleSetValue }}>
      {children}
    </SearchContext.Provider>
  );
}
export function useSearchContext() {
  return useContext(SearchContext);
}
