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
import { Title } from "./partials/title";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";

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
    ? dApps.filter((dapp) => {
        if (params.category === "instant-dapps") {
          return dapp.instantDapp;
        }
        return dapp.categories.find(({ slug }) => slug === params.category);
      })
    : dApps;

  // sort apps -> should also use the searchParams for sorting
  const sortedApps =
    typeof searchParams === "object" && searchParams["instant-dapps"] === "true"
      ? sortApps(filteredApps.filter(({ instantDapp }) => instantDapp))
      : sortApps(filteredApps);

  const instantDappCategory = {
    categoryDapps: sortedApps
      .filter(({ instantDapp }) => instantDapp)
      .map(({ slug }) => slug),

    description: t("categories.instantdApps.description"),
    name: t("categories.instantdApps.name"),
    slug: "instant-dapps",
  };
  const selectedCategory = categories?.find(
    (category) => category.slug === params.category,
  );

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
              keys(instantDappCategory) as (keyof typeof instantDappCategory)[],
            ),
          ),
        ]}
        params={params}
      />
      <Title
        nameDapp={selectedCategory?.name}
        amountDapps={sortedApps?.length}
      />
      {sortedApps?.length === 0 && (
        <div className="pt-36 flex flex-col items-center ">
          <IconSearch />
          <h6 className="text-xl mt-6 font-medium text-heading dark:text-heading-dark">
            No results found.
          </h6>
          <p className="mt-2 text-subheading dark:text-subheading-dark text-sm font-medium">
            Try another search query or change your filter settings.
          </p>
        </div>
      )}
      <EcosystemCardGrid>
        {sortedApps?.map((dApp) => (
          <EcosystemCard data={dApp} key={dApp.name} />
        ))}
      </EcosystemCardGrid>
    </>
  );
};
