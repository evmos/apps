"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSearchParams } from "next/navigation";
import { Header } from "./header/Header";
import { Navigation } from "@evmosapps/ui-helpers";
import { NAV_TO_VESTING } from "constants-helper";
import { AccountDetails } from "./content/AccountDetails";
import { useTranslation } from "next-i18next";

interface RouterQuery {
  account?: string;
}

export const VestingPage = () => {
  const searchParams = useSearchParams();
  const account = searchParams.get("account") ?? undefined;

  const { t } = useTranslation();
  return (
    <div className="px-2 md:px-0">
      {account !== undefined && <Navigation href="/" text={NAV_TO_VESTING} />}
      <Header />

      <div className="mt-8 w-full text-pearl">
        {account === undefined ? (
          <p className="flex justify-center ">
            {t("vesting.content.placeholder.title")}
          </p>
        ) : (
          <AccountDetails account={account} />
        )}
      </div>
    </div>
  );
};
