// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";
import Image from "next/image";
import { DropdownArrowIcon } from "@evmosapps/icons/DropdownArrowIcon";
import { cn } from "helpers";
import cx from "clsx";
export function CryptoSelector<T>(
  props: PropsWithChildren<{
    value: T;
    onChange: (value: T) => void;
  }>,
) {
  return (
    <div className="relative">
      <Listbox {...props} />
    </div>
  );
}

const Button = ({
  children,
  src,
  variant = "default",
  ...rest
}: PropsWithChildren<{
  src?: string;
  variant?: "default" | "black";
}>) => {
  return (
    <Listbox.Button
      className={cn(
        "flex space-x-2 items-center py-1 pl-1 pr-3 rounded-3xl justify-end tracking-wider",
        {
          "bg-gray-500 py-2 pl-2": variant === "default",
          "bg-black-900": variant === "black",
        },
      )}
      {...rest}
    >
      {src && (
        <Image
          src={src}
          className={cn("rounded-full bg-white", {
            "h-7 w-7 md:h-8 md:w-8": variant === "black",
            "h-5 w-5 md:h-6 md:w-6": variant === "default",
          })}
          alt=""
          width={24}
          height={24}
        />
      )}
      <span className="text-xxs md:text-xs text-white">{children}</span>
      <DropdownArrowIcon
        className="h-5 w-5 pointer-events-none text-red-300"
        aria-hidden="true"
      />
    </Listbox.Button>
  );
};
CryptoSelector.Button = Button;
const Options = ({
  children,
  className,
  label,
  variant = "default",
  ...props
}: PropsWithChildren<{
  className?: string;
  label: string;
  variant?: "default" | "multiple" | "wide";
}>) => {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={cn(
          // add the following className to the CryptoSelector.Options component: left:0 or right:0
          "absolute z-10 bg-gradient-to-br from-red-300 to-[#FFDDD880] p-[1px] rounded-2xl text-xs",
          className,
        )}
      >
        <div className="pr-3 py-5 bg-black rounded-2xl">
          <Listbox.Label className="px-3 text-xxxs md:text-xxs text-[#9A7873CC]">
            {label}
          </Listbox.Label>
          <Listbox.Options
            {...props}
            className={cx(
              "px-3 bg-black text-white h-full mt-1 scrollbar overflow-auto max-h-44 ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer",
              {
                "w-44 md:w-52": variant === "default",
                "w-56 md:w-64": variant === "wide",
                "w-64 md:w-80 grid grid-cols-2": variant === "multiple",
              },
            )}
          >
            {children}
          </Listbox.Options>
        </div>
      </div>
    </Transition>
  );
};

CryptoSelector.Options = Options;
const Option = <T,>({
  children,
  src,
  disabled = false,
  ...props
}: PropsWithChildren<{
  src: string;
  value: T;
  disabled?: boolean;
}>) => {
  return (
    <Listbox.Option
      disabled={disabled}
      className={({ active, selected }) =>
        cn(
          "flex items-center space-x-2 p-2 w-full  bg-black rounded-md mb-1 text-white text-xxs md:text-xs",
          {
            "bg-pink-600 text-black font-medium": active || selected,
            disabled: disabled,
          },
        )
      }
      {...props}
    >
      <Image
        className="h-5 w-5 bg-white rounded-full"
        src={src}
        alt=""
        width={30}
        height={30}
      />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {children}
      </div>
    </Listbox.Option>
  );
};

CryptoSelector.Option = Option;
