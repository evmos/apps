"use server";
import { fetchExplorerData } from "./fetch-explorer-data";

export const fetchCategoryBySlug = async (slug: string) => {
  const res = await fetchExplorerData();
  const category = res.categories.find((category) => category.slug === slug);
  return category ?? null;
};

export const fetchDappBySlug = async (slug: string) => {
  const res = await fetchExplorerData();
  const dapp = res.dApps.find((dapp) => dapp.slug === slug);
  return dapp ?? null;
};
