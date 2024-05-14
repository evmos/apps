// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import React, { useState } from "react";
import { WALLETS_TYPE, useSignIn } from "./useSignIn";

export const SearchFilter = () => {
  const { walletsToShow } = useSignIn();
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredOptions, setFilteredOptions] = useState([] as WALLETS_TYPE[]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);

    const filtered = walletsToShow.filter((option) => {
      const optionText = option && option.name.toLowerCase();
      return optionText?.includes(newSearchTerm);
    });

    setFilteredOptions(filtered);
  };

  return {
    searchTerm,
    handleSearchChange,
    filteredOptions: searchTerm ? filteredOptions : walletsToShow,
  };
};
