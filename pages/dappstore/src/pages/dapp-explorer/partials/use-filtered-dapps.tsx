// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { useMemo } from "react";
import {
  FilteredDAppsResults,
  SortBy,
  getFilteredDApps,
} from "./get-filtered-dapps";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export const useFilteredDapps = (initialData: FilteredDAppsResults) => {
  const searchParams = useSearchParams();
  const { category = "all" } = useParams<{ category?: string }>();
  const sortBy = searchParams.get("sort-by");
  const sanitizedSortBy = useMemo(() => {
    if (sortBy && ["asc", "desc", "created-at"].includes(sortBy)) {
      return sortBy as SortBy;
    }
    return "asc";
  }, [sortBy]);
  const instantDApps = searchParams.get("instant-dapps") === "true";
  const hasCustomFilter = instantDApps || sanitizedSortBy !== "asc";
  return useQuery({
    queryKey: ["dapps", category, sanitizedSortBy, instantDApps],
    refetchOnMount: hasCustomFilter,
    queryFn: () => {
      return getFilteredDApps({
        category,
        sortBy: sanitizedSortBy,
        instantDApps,
      });
    },
    initialData: hasCustomFilter ? undefined : initialData,
  });
};
