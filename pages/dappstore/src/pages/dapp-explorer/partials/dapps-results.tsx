// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { EcosystemCardGrid } from "../../landing/partials/ecosystem-card-grid";
import { EcosystemCard } from "../../landing/partials/ecosystem-card";
import { NoPageFound } from "./no-page-found";
import { CategoryHeader } from "./CategoryHeader";
import { HeaderCategories } from "./header-categories";
import { FilterApps } from "./filter-apps";
import { Category } from "../../../lib/fetch-explorer-data";
import { Suspense } from "react";
import { raise } from "helpers";
import { FilteredDAppsResults } from "./get-filtered-dapps";
import { useFilteredDapps } from "./use-filtered-dapps";
type DAppsResultsProps = {
  selectedCategory: string;
  initialData: FilteredDAppsResults;
  categories: Pick<Category, "name" | "slug" | "description">[];
};
export const _DAppsResults = ({
  initialData,
  categories,
  selectedCategory,
}: DAppsResultsProps) => {
  const { data = [], isFetching } = useFilteredDapps(initialData);
  return (
    <>
      <CategoryHeader
        category={
          categories.find((category) => category.slug === selectedCategory) ??
          raise("Category not found")
        }
        initialData={initialData}
      />
      <HeaderCategories
        selectedCategory={selectedCategory}
        categories={categories}
      />

      <FilterApps categories={categories} initialData={initialData} />
      {!isFetching && data.length === 0 && <NoPageFound />}
      <EcosystemCardGrid>
        {data?.map((dApp) => <EcosystemCard data={dApp} key={dApp.name} />)}
      </EcosystemCardGrid>
    </>
  );
};

export const DAppsResults = (props: DAppsResultsProps) => {
  return (
    <Suspense>
      <_DAppsResults {...props} />
    </Suspense>
  );
};
