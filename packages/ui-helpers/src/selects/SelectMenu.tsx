// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@evmosapps/icons/CheckIcon";
import { DropdownArrowIcon } from "@evmosapps/icons/DropdownArrowIcon";

import { Label } from "./Label";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

type SelectMenuProps = {
  label: string;
  options: string[];
  selected?: string;
  onChange?: (e: string) => void;
  id: string;
  disabled?: boolean;
  tooltip?: {
    description: string;
  };
};

export const SelectMenu = ({
  label,
  options,
  selected,
  onChange,
  id,
  disabled,
  tooltip,
}: SelectMenuProps) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className="flex w-full flex-col space-y-2">
          <Label id={id} tooltip={tooltip}>
            {label}
          </Label>
          <div className="relative mt-2" id={id}>
            <Listbox.Button
              className={`cursor-pointer text-left w-full textBoxStyle
            ${disabled && "disabled"}`}
            >
              <span>{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <DropdownArrowIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-gray text-black" : "text-black",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                          )}
                        >
                          {option}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-black" : "text-black",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};
