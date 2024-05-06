// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Fragment, useState } from "react";
import { IconLightning } from "@evmosapps/ui/icons/line/images/lightning.tsx";
import { Checkbox } from "@evmosapps/ui/components/checkboxs/checkbox.tsx";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Listbox, Transition } from "@headlessui/react";
import { IconChevronDown } from "@evmosapps/ui/icons/line/arrows/chevron-down.tsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const sortOptions = [
  {
    id: 1,
    name: "A to Z",
    unavailable: false,
    onClick: (
      params: ReadonlyURLSearchParams,
      router: AppRouterInstance,
      pathname: string,
    ) => {
      const newParams = new URLSearchParams(params.toString());
      newParams.set("sort-by", "asc");
      router.push(`${pathname}?${newParams.toString()}`);
      // TODO:set search param with the sort type to then filter it on the dapp-explorer-page
    },
  },
];

export const Title = ({
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

  return (
    <div className="pt-14 flex items-center justify-between">
      <p className="hidden lg:inline-block text-heading dark:text-heading-dark text-xl font-medium">
        {nameDapp ?? "dApps"}
        <span className="text-subheading dark:text-subheading-dark font-medium text-sm pl-2">
          {amountDapps} results
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
              } else {
                newParams.set("instant-dapps", "true");
              }

              router.push(`${pathname}?${newParams.toString()}`);
            }}
            label={
              <div className="flex items-center space-x-1">
                <IconLightning className="h-3 w-3 text-primary-container dark:text-primary-container-dark" />
                <p className="text-primary dark:text-primary-dark text-sm ">
                  Instant
                </p>
              </div>
            }
          />
        </div>
        <div className="z-20">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
              <Listbox.Button
                as="div"
                className="cursor-pointer border min-w-32 text-subheading dark:text-subheading-dark font-normal text-base flex items-center justify-between border-surface-container-highest dark:border-surface-container-highest-dark rounded-lg px-4 py-3 gap-2"
              >
                <span className="block truncate">{selected?.name}</span>

                <IconChevronDown
                  className={`w-5 text-paragraph dark:text-paragraph-dark`}
                />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="space-y-5 z-30 text-sm absolute right-0 mt-4 max-h-60 w-full overflow-auto  origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl pt-6 p-3">
                  {sortOptions.map((option) => (
                    <Listbox.Option
                      onClick={() =>
                        selected?.id !== option.id &&
                        option.onClick(params, router, pathname)
                      }
                      key={option.id}
                      className={` cursor-pointer flex items-center justify-between w-full py-3 px-3 [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 hover:rounded-lg 
                      focus-visible:rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10
                       ${
                         selected?.id === option.id &&
                         " bg-primary/10 dark:bg-primary-dark/10 rounded-lg"
                       }`}
                      value={option}
                    >
                      {option.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};
