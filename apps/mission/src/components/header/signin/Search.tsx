// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import React, { useState } from "react";
import { WALLETS_TYPE } from "./useSignin";

export const SearchFilter = (options: WALLETS_TYPE[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value.toLowerCase(); // Make search case-insensitive
    setSearchTerm(newSearchTerm);

    const filtered = options.filter((option) => {
      const optionText = option && option.name.toLowerCase(); // Ensure case-insensitive search
      return optionText?.includes(newSearchTerm);
    });

    setFilteredOptions(filtered);
  };

  return {
    searchTerm,
    handleSearchChange,
    filteredOptions,
  };
};
