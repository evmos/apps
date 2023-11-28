"use server";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "../../lib/fetch-explorer-data";
import { EcosystemCard } from "../landing/partials/ecosystem-card";
import { EcosystemCardGrid } from "../landing/partials/ecosystem-card-grid";
import { ExplorerBreadcrumbs } from "./partials/explorer-breadcrumbs";
import { HeaderCategories } from "./partials/header-categories";
import { translation } from "@evmosapps/i18n/server";
import { pick, keys } from "lodash-es";
export const DappExplorerPage = async ({
  params,
}: {
  params: { category?: string };
}) => {
  const { t } = await translation("dappStore");
  const { dApps, categories } = await fetchExplorerData();

  const filteredApps = params.category
    ? dApps.filter((dapp) => {
        if (params.category === "instant-dapps") {
          return dapp.instantDapp;
        }
        return dapp.categorySlug === params.category;
      })
    : dApps;

  const sortedApps = filteredApps.sort((a, b) => {
    const alphabeticalOrder = a.name.localeCompare(b.name);

    // If both apps have the same instant-dapp property, return alphabetical order
    if (a.instantDapp === b.instantDapp) {
      return alphabeticalOrder;
    }
    // Otherwise, instant-dapp apps come first
    return a.instantDapp ? -1 : 1;
  });
  const instantDappCategory = {
    categoryDapps: sortedApps
      .filter(({ instantDapp }) => instantDapp)
      .map(({ slug }) => slug),

    description: t("categories.instantdApps.description"),
    name: t("categories.instantdApps.name"),
    slug: "instant-dapps",
  };

  return (
    <>
      <ExplorerBreadcrumbs params={params} />
      <HeaderCategories
        dApps={dApps}
        amountAppsSelected={sortedApps?.length ?? 0}
        categories={[
          {
            categoryDapps: sortedApps
              .filter(({ instantDapp }) => instantDapp)
              .map(({ slug }) => slug),

            description: t("categories.instantdApps.description"),
            name: t("categories.instantdApps.name"),
            slug: "instant-dapps",
          },
          ...categories.map((category) =>
            pick(
              category,
              keys(instantDappCategory) as (keyof typeof instantDappCategory)[]
            )
          ),
        ]}
        params={params}
      />

      <EcosystemCardGrid className="pt-8">
        {sortedApps?.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </EcosystemCardGrid>
    </>
  );
};
