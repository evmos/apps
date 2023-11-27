// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import { Search } from "@evmosapps/ui-helpers";
import { useTranslation } from "next-i18next";
export const SearchVesting = () => {
  const router = useRouter();

  const handleRouting = () => {
    void router.push({ pathname: "/", query: { account: value } });
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

  const { t } = useTranslation();

  const props = {
    placeholder: t("search.placeholder"),
    handleKeyDown,
    handleOnClick,
    value,
    handleSetValue,
  };
  return <Search props={props} />;
};
