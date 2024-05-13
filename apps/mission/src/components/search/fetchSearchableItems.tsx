// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import {
  DApp,
  fetchExplorerData,
} from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { tryReadPropertyAs } from "helpers/src/clients/notion-utils";
import { notion } from "helpers/src/clients/notion";
import { unstable_cache } from "next/cache";

export const fetchSearchableItems = unstable_cache(async () => {
  const { dApps } = await fetchExplorerData();
  const dappsById = dApps.reduce<Record<string, DApp>>((acc, dApp) => {
    acc[dApp.id] = dApp;
    return acc;
  }, {});
  const trendingPage = await notion.pages.retrieve({
    page_id: "6c41ce67f06a401796e3279b1cd80021",
  });

  const trending = tryReadPropertyAs(
    trendingPage,
    "dApps",
    "relation",
  ).relation.flatMap(({ id }) => {
    const dApp = dappsById[id];
    if (!dApp) {
      return [];
    }
    return [dApp.slug];
  });
  return {
    trending,
    entries: dApps.map((dApp) => ({
      name: dApp.name,
      slug: dApp.slug,
      href: `/dapps/${dApp.categorySlug}/${dApp.slug}`,
      icon: dApp.icon,
      categories: dApp.categories,
      instantDapp: dApp.instantDapp,
    })),
  };
}, ["searchable-items"]);
