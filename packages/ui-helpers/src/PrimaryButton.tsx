// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Link } from "@evmosapps/i18n/client";
import { cn } from "helpers";
import React from "react";
import { ComponentProps } from "react";

export const PrimaryButton = <
  T extends "button" | "a" | typeof Link = "button",
>({
  as = "button" as T,
  variant = "primary",
  disabled,
  children,
  className,
  icon,
  ...rest
}: ComponentProps<T> & {
  variant?: "primary" | "outline-primary" | "primary-lg" | "secondary";
  icon?: JSX.Element;
  disabled?: boolean;
  as?: T;
}) => {
  className = cn(
    "w-fit text-sm px-4 py-3 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3 tracking-wider",
    {
      "bg-red-300 text-pearl hover:bg-red1 active:bg-red2":
        variant === "primary",
      "border-2 text-pearl border-pink-300 gradient w-full text-sm md:text-base rounded-md font-medium":
        variant === "outline-primary",
      "bg-red-300 text-pearl hover:bg-red1 active:bg-red2 w-full text-xs md:text-sm capitalize font-medium":
        variant === "primary-lg",
      "w-fit rounded px-6 py-3 text-xs font-bold transition-all duration-200 ease-in-out text-red-300 bg-pearl hover:bg-[#e3d6c3] active:bg-[#ccc0af]":
        variant === "secondary",
    },
    className,
    disabled ? "disabled" : "",
  );
  return React.createElement(
    as,
    {
      className,
      disabled,
      ...rest,
    } as never,
    <>
      {icon && <span>{icon}</span>} {children}
    </>,
  );
};
