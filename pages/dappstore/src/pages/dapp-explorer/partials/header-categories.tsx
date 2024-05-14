// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps, useMemo } from "react";
import { Link, Trans } from "@evmosapps/i18n/client";

import { Title } from "@evmosapps/ui-helpers/src/titles/Title";

import { Category, DApp } from "../../../lib/fetch-explorer-data";

import { TrackerEvent } from "@evmosapps/ui-helpers";
import { cn } from "helpers";
import { CLICK_ON_CATEGORY } from "tracker";
import { Chip } from "@evmosapps/ui/chips/Chip.tsx";
export const HeaderCategories = ({
  amountAppsSelected,
  categories,
  params,
}: {
  dApps: DApp[];
  amountAppsSelected: number;
  categories: Pick<
    Category,
    "categoryDapps" | "name" | "slug" | "description"
  >[];
  params: { category?: string };
}) => {
  const selectedCategory = useMemo(() => {
    return categories.find((category) => category.slug === params.category);
  }, [categories, params.category]);

  return (
    <>
      <div className="flex flex-col relative">
        <CategoryHeader
          category={selectedCategory}
          totalCategoryCount={amountAppsSelected}
        />
      </div>
      <div className="flex gap-3 md:gap-4 flex-wrap">
        {categories.map((category) => (
          <TrackerEvent
            key={category.slug}
            event={CLICK_ON_CATEGORY}
            properties={{ Category: category.name }}
          >
            <Link
              href={
                category.slug === params.category
                  ? "/dapps"
                  : `/dapps/${category.slug}`
              }
              key={category.slug}
              scroll={false}
            >
              <Chip
                className={cn("px-4 font-light", {
                  "bg-primary/25 dark:bg-primary-dark/25 text-primary dark:text-primary-dark":
                    params.category === category.slug,
                })}
              >
                {category.name}
              </Chip>
            </Link>
          </TrackerEvent>
        ))}
      </div>
    </>
  );
};

const CategoryHeader = ({
  category,
  totalCategoryCount,
  ...rest
}: {
  category?: Pick<Category, "categoryDapps" | "name" | "slug" | "description">;
  totalCategoryCount: number;
} & ComponentProps<"div">) => {
  const categoryName =
    category?.name === "All" ? "dApps" : category?.name ?? "dApps";

  return (
    <div className="md:mt-5" {...rest}>
      <Title variant="xl" tag="h4">
        <Trans
          ns="dappStore"
          shouldUnescape={true}
          i18nKey="categories.title"
          values={{
            name: categoryName.endsWith("dApps")
              ? categoryName
              : `${categoryName} dApps`,

            count:
              category === undefined
                ? totalCategoryCount
                : category.categoryDapps.length > 3
                  ? category.categoryDapps.length
                  : undefined,
          }}
        />
      </Title>
    </div>
  );
};
