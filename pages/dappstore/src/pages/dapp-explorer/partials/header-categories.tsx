// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Link } from "@evmosapps/i18n/client";
import { Category } from "../../../lib/fetch-explorer-data";
import { TrackerEvent } from "@evmosapps/ui-helpers";
import { cn } from "helpers";
import { CLICK_ON_CATEGORY } from "tracker";
import { Chip } from "@evmosapps/ui/chips/Chip.tsx";
import { useSearchParams } from "next/navigation";

export const HeaderCategories = ({
  categories,
  selectedCategory = "all",
}: {
  selectedCategory?: string;
  categories: Pick<Category, "name" | "slug" | "description">[];
}) => {
  const searchParams = useSearchParams().toString();
  return (
    <div className="flex gap-3 md:gap-4 flex-wrap">
      {categories.map((category) => {
        let href =
          category.slug === selectedCategory || category.slug === "all"
            ? "/dapps"
            : `/dapps/${category.slug}`;
        if (searchParams) {
          href += `?${searchParams}`;
        }

        return (
          <TrackerEvent
            key={category.slug}
            event={CLICK_ON_CATEGORY}
            properties={{ Category: category.name }}
          >
            <Link href={href} key={category.slug} scroll={false}>
              <Chip
                className={cn("px-4 font-light", {
                  "bg-primary/25 dark:bg-primary-dark/25 text-primary dark:text-primary-dark":
                    selectedCategory === category.slug,
                })}
              >
                {category.name}
              </Chip>
            </Link>
          </TrackerEvent>
        );
      })}
    </div>
  );
};
