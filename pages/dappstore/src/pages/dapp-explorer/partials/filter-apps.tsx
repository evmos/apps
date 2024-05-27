// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning.tsx";
import { Checkbox } from "@evmosapps/ui/components/checkboxs/checkbox.tsx";
import { useRouter, useSearchParams } from "next/navigation";

import { Listbox } from "@evmosapps/ui/components/listboxs/listbox.tsx";
import { IconChevronDown } from "@evmosapps/ui/icons/line/arrows/chevron-down.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { sendEvent, CLICK_SORT, CLICK_FILTER, UNCLICK_FILTER } from "tracker";
import { FilteredDAppsResults, SortBy } from "./get-filtered-dapps";
import { useParams } from "next/navigation";
import { useFilteredDapps } from "./use-filtered-dapps";
import { startTransition } from "./startTransition";
import { useState } from "react";

const sortLabels = {
  asc: "A to Z",
  desc: "Z to A",
  "created-at": "Newly Added",
};

export const FilterApps = ({
  initialData,
  categories,
}: {
  initialData: FilteredDAppsResults;
  categories: { slug: string; name: string }[];
}) => {
  const dApps = useFilteredDapps(initialData);
  const { category = "all" } = useParams<{ category?: string }>();
  const categoryName = categories.find((c) => c.slug === category)?.name;
  const params = useSearchParams();
  const instantDapps = params.get("instant-dapps") === "true";
  const sortBy = params.get("sort-by") as SortBy;
  const router = useRouter();
  const { t } = useTranslation("dappStore");
  const [selectedSort, setSelectedSort] = useState(
    sortLabels[sortBy] ?? sortLabels["created-at"],
  );
  return (
    <div className="md:pt-4 flex items-center justify-between">
      <p className="hidden lg:inline-block text-heading dark:text-heading-dark text-xl font-medium">
        {categoryName ?? t("filteredApps.all")}
        <span className="text-subheading dark:text-subheading-dark font-medium text-sm pl-2">
          {dApps.data
            ? `${dApps.data.length} ${t("filteredApps.amount")}`
            : t("filteredApps.loading")}
        </span>
      </p>
      <div className="flex w-full lg:w-fit justify-between lg:justify-end items-center  space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="instant-dapp"
            checked={instantDapps}
            onChange={(e) => {
              const checked = e.target.checked;
              startTransition(() => {
                const url = new URL(window.location.href);
                url.searchParams.set("instant-dapps", checked.toString());
                router.push(url.toString());
              });
              if (checked) {
                sendEvent(UNCLICK_FILTER, {
                  "Filter Type": "Instant dApp",
                });
              } else {
                sendEvent(CLICK_FILTER, {
                  "Filter Type": "Instant dApp",
                });
              }
            }}
            label={
              <div className="flex items-center space-x-1">
                <IconLightning className="h-3 w-3 text-primary-container dark:text-primary-container-dark" />
                <p className="text-primary dark:text-primary-dark text-sm ">
                  {t("filteredApps.checkbox.label")}
                </p>
              </div>
            }
          />
        </div>
        <div className="z-20">
          <Listbox.Menu
            value={sortBy}
            onChange={(selected) => {
              const url = new URL(window.location.href);
              startTransition(() => {
                url.searchParams.set("sort-by", selected);
                router.push(url.toString());
              });
              sendEvent(CLICK_SORT, {
                "Sort Type": sortLabels[selected],
              });
              setSelectedSort(selected);
            }}
          >
            <Listbox.Button className="cursor-pointer border w-44 text-subheading dark:text-subheading-dark font-normal text-base flex items-center justify-between border-surface-container-highest dark:border-surface-container-highest-dark rounded-lg px-4 py-2 gap-2">
              <span className="block truncate">
                {sortLabels[sortBy] ?? sortLabels["created-at"]}
              </span>
              <IconChevronDown
                className={`w-5 text-paragraph dark:text-paragraph-dark`}
              />
            </Listbox.Button>

            <Listbox.Options className="w-44">
              {Object.entries(sortLabels).map(([id, label]) => (
                <Listbox.Option
                  key={id}
                  value={id}
                  activeSort={selectedSort === label}
                >
                  {label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox.Menu>
        </div>
      </div>
    </div>
  );
};
