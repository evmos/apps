// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use server";
import { cache } from "react";

import { fetchDapps } from "./fetch-dapps";
import { fetchCategories } from "./fetch-categories";
import { raise } from "helpers";
import { devMemo } from "helpers/src/dev/dev-memo";

export const fetchExplorerData = devMemo(
  cache(async () => {
    const categoriesMap = await fetchCategories();
    const dappsMap = await fetchDapps();

    const dApps = Object.entries(dappsMap).map(([id, projectEntry]) => {
      const { name, slug, categories, ...rest } = projectEntry;
      const dappCategories = categories.flatMap((categoryId) => {
        const category = categoriesMap.get(categoryId);
        if (!category) return [];
        const { name, slug } = category;
        return [{ name, slug }];
      });

      const mainCategory =
        dappCategories[0] ?? raise(`No category for ${name}`);

      return {
        id,
        name: name,
        slug,
        categoryName: mainCategory.name,
        categorySlug: mainCategory.slug,
        categories: dappCategories,
        ...rest,
      };
    });

    const categories = [...categoriesMap.values()]
      .map((category) => {
        const { projects, ...rest } = category;
        return {
          categoryDapps: projects.flatMap((projectId) => {
            const projectEntry = dappsMap[projectId];
            if (!projectEntry) return [];
            return [projectEntry.slug];
          }),
          ...rest,
        };
      })
      .filter(({ categoryDapps }) => categoryDapps.length > 0)
      .sort((a, b) => a.name.localeCompare(b.name));
    return {
      categories,
      dApps,
    };
  }),
  {
    tags: ["fetchExplorerData"],
    revalidate: 60 * 10,
  },
);

export type Category = Awaited<
  ReturnType<typeof fetchExplorerData>
>["categories"][number];
export type DApp = Awaited<
  ReturnType<typeof fetchExplorerData>
>["dApps"][number];
