// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ComponentProps, useMemo } from "react";
import { Trans } from "@evmosapps/i18n/client";
import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import { Category } from "../../../lib/fetch-explorer-data";
import { useSearchParams } from "next/navigation";
import { FilteredDAppsResults } from "./get-filtered-dapps";
import { useFilteredDapps } from "./use-filtered-dapps";

export const CategoryHeader = ({
  category,
  initialData,
}: {
  category: Pick<Category, "name" | "slug" | "description">;
  initialData: FilteredDAppsResults;
} & ComponentProps<"div">) => {
  const searchParams = useSearchParams();
  const { data } = useFilteredDapps(initialData);
  const instantDapp = searchParams.get("instant-dapps") === "true";
  const count = data?.length;
  const titleTKey = useMemo(() => {
    if (category.slug === "all") {
      return "categories.title.all";
    }

    if (count === undefined || count > 3) {
      return "categories.title.many";
    }
    return "categories.title.few";
  }, [count, category.slug]);
  return (
    <div className="md:mt-5">
      <Title variant="xl" tag="h4">
        <Trans
          ns="dappStore"
          shouldUnescape={true}
          i18nKey={titleTKey + (instantDapp ? "Instant" : "")}
          values={{
            categoryName: category.name,
            count: count ?? "",
          }}
        />
      </Title>
    </div>
  );
};
