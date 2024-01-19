// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";

import { Search } from "@evmosapps/ui-helpers";
import { useRouter } from "next/navigation";
import { useTranslation } from "@evmosapps/i18n/client";
export const SearchVesting = () => {
  const router = useRouter();

  const handleRouting = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("account", value);
    void router.push(url.toString());
  };
  const handleOnClick = () => {
    handleRouting();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleRouting();
    }
  };
  const [value, setValue] = useState("");

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const { t } = useTranslation("vesting");

  const props = {
    placeholder: t("search.placeholder"),
    handleKeyDown,
    handleOnClick,
    value,
    handleSetValue,
  };
  return <Search props={props} />;
};
