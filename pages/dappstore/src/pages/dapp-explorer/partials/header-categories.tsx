// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps, useMemo } from "react";
import { Link, Trans } from "@evmosapps/i18n/client";

import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import { Subtitle } from "@evmosapps/ui-helpers/src/titles/Subtitle";
import { Category, DApp } from "../../../lib/fetch-explorer-data";

import { translation } from "@evmosapps/i18n/server";
import { Badge, TrackerEvent } from "@evmosapps/ui-helpers";
import { cn } from "helpers";
import { CLICK_ON_CATEGORY } from "tracker";
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
              <Badge
                className={cn({
                  "pl-9 md:pl-9 lg:pl-10 relative before:content-[''] before:absolute before:top-[50%] before:left-3 lg:before:left-[0.9rem] before:-translate-y-1/2 before:w-[12px] before:h-[12px] before:bg-red-300 before:rounded-full":
                    params.category === category.slug,
                })}
                variant="dark"
              >
                {category.name}
              </Badge>
            </Link>
          </TrackerEvent>
        ))}
      </div>
    </>
  );
};

const CategoryHeader = async ({
  category,
  totalCategoryCount,
  ...rest
}: {
  category?: Pick<Category, "categoryDapps" | "name" | "slug" | "description">;
  totalCategoryCount: number;
} & ComponentProps<"div">) => {
  const categoryName = category?.name ?? "dApps";
  const { t } = await translation("dappStore");
  return (
    <div className="space-y-2" {...rest}>
      <Title className="text-2xl lg:text-[2.3rem]">
        <Trans
          ns="dappStore"
          shouldUnescape={true}
          i18nKey="categories.title"
          components={{
            b: <strong className="font-bold" />,
          }}
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

      <div className="relative text-base text-[#E8DFD3]">
        <Subtitle>
          {category?.description.plainText ?? t("categories.description")}
        </Subtitle>
      </div>
    </div>
  );
};
