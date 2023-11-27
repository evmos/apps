import { Log, raise } from "helpers";
import slugify from "slugify";

import { cache } from "react";

import { fetchDapps } from "./fetch-dapps";
import { fetchCategories } from "./fetch-categories";
const _fetchExplorerData = cache(async () => {
  const categoriesMap = await fetchCategories();
  const dappsMap = await fetchDapps();

  const categories = [];
  const dApps = [];
  for (const { name, projects, ...rest } of categoriesMap.values()) {
    const categorySlug = slugify(name, { lower: true, strict: true });
    const categoryName = name;

    const categoryDapps: string[] = [];
    for (const projectId of projects) {
      const { name, ...rest } =
        dappsMap.get(projectId) ?? raise("Project not found");

      dApps.push({
        name: name,

        categorySlug,
        categoryName,
        ...rest,
      });

      categoryDapps.push(rest.slug);
    }
    const category = {
      name: categoryName,
      slug: categorySlug,
      categoryDapps,
      ...rest,
    };
    categories.push(category);
  }

  return {
    categories,
    dApps,
  };
});
export const fetchExplorerData = async () => {
  if (process.env.NODE_ENV === "development" && !process.env.NOTION_API_KEY) {
    Log().warn([
      "process.env.NOTION_API_KEY is not set, serving mock data in dev mode instead",
    ]);

    const data = await import("./mock-explorer-data.json");
    return data satisfies Awaited<ReturnType<typeof _fetchExplorerData>>;
  }
  return _fetchExplorerData();
};
export type Category = Awaited<
  ReturnType<typeof _fetchExplorerData>
>["categories"][number];
export type DApp = Awaited<
  ReturnType<typeof _fetchExplorerData>
>["dApps"][number];
