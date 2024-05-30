// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { ExplorerBreadcrumbs } from "./partials/explorer-breadcrumbs";
import { translation } from "@evmosapps/i18n/server";
import { DAppsResults } from "./partials/dapps-results";
import {
  getFilteredDApps,
  cachedFetchCategories,
} from "./partials/get-filtered-dapps";
import { DynamicSections } from "../landing/partials/DynamicSections";

export const DappExplorerPage = async ({
  params,
}: {
  params: { category?: string };
}) => {
  const [{ t }, categories, filteredDApps] = await Promise.all([
    translation("dappStore"),
    cachedFetchCategories(),
    getFilteredDApps({
      category: params.category ?? "all",
      sortBy: "created-at",
      instantDApps: false,
    }),
  ]);
  const listedCategories = [
    {
      description: t("categories.all.description"),
      name: t("categories.all.name"),
      slug: "all",
    },
    ...categories.map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
    })),
  ];
  return (
    <div className="flex flex-col gap-y-8">
      <div className="md:mt-10">
        <ExplorerBreadcrumbs params={params} />
      </div>
      <DAppsResults
        selectedCategory={params.category ?? "all"}
        categories={listedCategories}
        initialData={filteredDApps}
      />

      {/* Explore dapps banner */}
      <DynamicSections placement={"Categories Page"} />
    </div>
  );
};
