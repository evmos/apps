// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useTranslation } from "@evmosapps/i18n/client";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";
export const NoPageFound = () => {
  const { t } = useTranslation("dappStore");
  return (
    <div className="pt-36 flex flex-col items-center ">
      <IconSearch />
      <h6 className="text-xl mt-6 font-medium text-heading dark:text-heading-dark">
        {t("filteredApps.notFound.title")}
      </h6>
      <p className="mt-2 text-subheading dark:text-subheading-dark text-sm font-medium">
        {t("filteredApps.notFound.description")}
      </p>
    </div>
  );
};
