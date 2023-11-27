"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo, useState } from "react";
import { Link } from "@evmosapps/i18n/client";
import { cn } from "helpers";
import { Badge } from "@evmosapps/ui-helpers";
import { Title } from "@evmosapps/ui-helpers/src/titles/Title";
import { Subtitle } from "@evmosapps/ui-helpers/src/titles/Subtitle";
import { Category, DApp } from "../../../lib/fetch-explorer-data";

export const HeaderCategories = ({
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
  const [hoveredCategorySlug, setHoveredCategory] = useState<null | string>(
    null
  );

  const handleCategoryHover = (category: string | null) => {
    setHoveredCategory(category);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  const hoveredCategory = useMemo(() => {
    return categories.find((category) => category.slug === hoveredCategorySlug);
  }, [hoveredCategorySlug, categories]);

  const selectedCategory = useMemo(() => {
    return categories.find((category) => category.slug === params.category);
  }, [categories, params.category]);

  const displayedCategory = hoveredCategory || selectedCategory;

  const totalAmountdApps = useMemo(() => {
    return categories.reduce((acc, category) => {
      if (category.slug === "instant-dapps") {
        return acc;
      }
      return acc + category.categoryDapps.length;
    }, 0);
  }, [categories]);

  return (
    <>
      <div className="flex space-y-2 flex-col">
        <Title>
          Explore the{" "}
          <span className="font-bold ">
            {/* TODO: add correct styling for params.category  */}
            {displayedCategory?.categoryDapps.length ?? totalAmountdApps}{" "}
            {displayedCategory?.name ?? "dApps"}
          </span>{" "}
          on Evmos
        </Title>
        <Subtitle className="min-h-[1lh]">
          {displayedCategory?.description ??
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}{" "}
        </Subtitle>
      </div>
      <div className="flex gap-5 flex-wrap" onMouseLeave={handleCategoryLeave}>
        {categories.map((category) => (
          <Link
            href={
              category.slug === params.category
                ? "/dapps"
                : `/dapps/${category.slug}`
            }
            key={category.slug}
          >
            <Badge
              className={cn({
                // TODO:  create reusable component for circle
                "bg-[#FFF4E14D] pl-9 relative before:content-[''] before:absolute before:top-[50%] before:left-3 before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:bg-red-300 before:rounded-full":
                  params.category === category.slug,
              })}
              variant="dark"
              onMouseEnter={() => handleCategoryHover(category.slug)}
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
    </>
  );
};
