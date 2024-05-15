// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use server";
import { unstable_cache } from "next/cache";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";

export type SortBy = "created-at" | "asc" | "desc";

export const cachedFetchDapps = unstable_cache(async () => {
  const { dApps } = await fetchExplorerData();
  return dApps;
});

export const cachedFetchCategories = unstable_cache(async () => {
  const { categories } = await fetchExplorerData();
  return categories;
});

export const getFilteredDApps = async ({
  category,
  sortBy,
  instantDApps,
}: {
  category: string;
  sortBy: SortBy;
  instantDApps: boolean;
}) => {
  const dApps = await cachedFetchDapps();

  const filteredDApps = dApps.filter((dapp) => {
    if (instantDApps && dapp.instantDapp === false) return false;
    if (category === "all") {
      return true;
    }
    return dapp.categories.some(({ slug }) => slug === category);
  });
  if (sortBy === "created-at") {
    filteredDApps.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  } else if (sortBy === "asc") {
    filteredDApps.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  } else if (sortBy === "desc") {
    filteredDApps.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  }

  return filteredDApps;
};

export type FilteredDAppsResults = Awaited<ReturnType<typeof getFilteredDApps>>;
