// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { fetchExplorerData } from "../../lib/fetch-explorer-data";
import { sortApps } from "../../lib/sort/sort-dapps";
import { EcosystemCard } from "../landing/partials/ecosystem-card";
import { EcosystemCardGrid } from "../landing/partials/ecosystem-card-grid";
import { ExplorerBreadcrumbs } from "./partials/explorer-breadcrumbs";
import { HeaderCategories } from "./partials/header-categories";
import { translation } from "@evmosapps/i18n/server";
import { pick, keys } from "lodash-es";
import { FilterApps } from "./partials/filter-apps";
import { NoPageFound } from "./partials/no-page-found";

export const DappExplorerPage = async ({
  params,
  searchParams,
}: {
  params: { category?: string };
  searchParams: () => { values: string };
}) => {
  const { t } = await translation("dappStore");
  const { dApps, categories } = await fetchExplorerData();

  const filteredApps = params.category
    ? params.category === "all"
      ? dApps // Return all dApps if category is "all"
      : dApps.filter((dapp) =>
          dapp.categories.some(({ slug }) => slug === params.category),
        ) // Filter by matching category
    : dApps; // Return all dApps if no category is provided

  const sortedApps =
    typeof searchParams === "object" && searchParams["instant-dapps"] === "true"
      ? sortApps(filteredApps.filter(({ instantDapp }) => instantDapp))
      : sortApps(filteredApps);

  const allDappsCategory = {
    categoryDapps: sortedApps,
    description: t("categories.all.description"),
    name: t("categories.all.name"),
    slug: "all",
  };
  const selectedCategory = categories?.find(
    (category) => category.slug === params.category,
  );

  return (
    <div className="flex flex-col gap-y-8 container max-w-screen-xl mx-auto ">
      <ExplorerBreadcrumbs params={params} />
      <HeaderCategories
        dApps={dApps}
        amountAppsSelected={sortedApps?.length ?? 0}
        categories={[
          {
            categoryDapps: sortedApps.map(({ slug }) => slug),
            description: t("categories.all.description"),
            name: t("categories.all.name"),
            slug: "all",
          },
          ...categories.map((category) =>
            pick(
              category,
              keys(allDappsCategory) as (keyof typeof allDappsCategory)[],
            ),
          ),
        ]}
        params={params}
      />
      <FilterApps
        nameDapp={selectedCategory?.name}
        amountDapps={sortedApps?.length}
      />
      {sortedApps?.length === 0 && <NoPageFound />}
      <EcosystemCardGrid>
        {sortedApps?.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </EcosystemCardGrid>
    </div>
  );
};
