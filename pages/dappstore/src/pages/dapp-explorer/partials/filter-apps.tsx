// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useState } from "react";
import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning.tsx";
import { Checkbox } from "@evmosapps/ui/components/checkboxs/checkbox.tsx";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Listbox } from "@evmosapps/ui/components/listboxs/listbox.tsx";
import { IconChevronDown } from "@evmosapps/ui/icons/line/arrows/chevron-down.tsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useTranslation } from "@evmosapps/i18n/client";
import { sendEvent, CLICK_SORT, CLICK_FILTER, UNCLICK_FILTER } from "tracker";
const sortOptions = [
  {
    id: 1,
    name: "A to Z",
    onClick: (
      params: ReadonlyURLSearchParams,
      router: AppRouterInstance,
      pathname: string,
    ) => {
      const newParams = new URLSearchParams(params.toString());
      newParams.set("sort-by", "asc");
      router.push(`${pathname}?${newParams.toString()}`);
      sendEvent(CLICK_SORT, {
        "Sort Type": "A->Z",
      });
    },
  },
  {
    id: 2,
    name: "Z to A",
    onClick: (
      params: ReadonlyURLSearchParams,
      router: AppRouterInstance,
      pathname: string,
    ) => {
      const newParams = new URLSearchParams(params.toString());
      newParams.set("sort-by", "desc");
      router.push(`${pathname}?${newParams.toString()}`);
      sendEvent(CLICK_SORT, {
        "Sort Type": "Z->A",
      });
    },
  },
];

export const FilterApps = ({
  nameDapp,
  amountDapps,
}: {
  nameDapp: string | undefined;
  amountDapps: number | undefined;
}) => {
  const params = useSearchParams();
  const [isChecked, setIsChecked] = useState(
    params.get("instant-dapps") === "true" ?? false,
  );
  const [selected, setSelected] = useState(sortOptions[0]);

  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation("dappStore");
  return (
    <div className="pt-14 flex items-center justify-between">
      <p className="hidden lg:inline-block text-heading dark:text-heading-dark text-xl font-medium">
        {nameDapp ?? t("filterdApps.all")}
        <span className="text-subheading dark:text-subheading-dark font-medium text-sm pl-2">
          {amountDapps} {t("filterdApps.amount")}
        </span>
      </p>
      <div className="flex w-full lg:w-fit justify-between lg:justify-end items-center  space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="instant-dapp"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              const newParams = new URLSearchParams(params.toString());
              if (e.target.checked === false) {
                newParams.set("instant-dapps", "false");
                sendEvent(UNCLICK_FILTER, {
                  "Filter Type": "Instant dApp",
                });
              } else {
                newParams.set("instant-dapps", "true");
                sendEvent(CLICK_FILTER, {
                  "Filter Type": "Instant dApp",
                });
              }

              router.push(`${pathname}?${newParams.toString()}`);
            }}
            label={
              <div className="flex items-center space-x-1">
                <IconLightning className="h-3 w-3 text-primary-container dark:text-primary-container-dark" />
                <p className="text-primary dark:text-primary-dark text-sm ">
                  {t("filterdApps.checkbox.label")}
                </p>
              </div>
            }
          />
        </div>
        <div className="z-20">
          <Listbox.Menu value={selected} onChange={setSelected}>
            <Listbox.Button className="cursor-pointer border min-w-32 text-subheading dark:text-subheading-dark font-normal text-base flex items-center justify-between border-surface-container-highest dark:border-surface-container-highest-dark rounded-lg px-4 py-2 gap-2">
              <span className="block truncate">{selected?.name}</span>
              <IconChevronDown
                className={`w-5 text-paragraph dark:text-paragraph-dark`}
              />
            </Listbox.Button>

            <Listbox.Options className="min-w-32">
              {sortOptions.map((option) => (
                <Listbox.Option
                  onClick={() =>
                    selected?.id !== option.id &&
                    option.onClick(params, router, pathname)
                  }
                  key={option.id}
                  selected={selected?.id === option.id}
                  value={option}
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox.Menu>
        </div>
      </div>
    </div>
  );
};
