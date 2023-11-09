// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ComponentProps } from "react";

export const PrimaryButton = ({
  variant = "primary",
  onClick,
  children,
  className,
  icon,
  type = "button",
  disabled,
  ...rest
}: ComponentProps<"button"> & {
  variant?: "primary" | "outline-primary" | "primary-lg" | "secondary";
  icon?: JSX.Element;
  type?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "w-fit text-sm px-4 py-3 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3 tracking-wider",

        {
          "bg-red text-pearl hover:bg-red1 active:bg-red2":
            variant === "primary",
          "border-2 border-pink-300 gradient w-full text-base md:text-lg rounded-md font-medium":
            variant === "outline-primary",
          "bg-red text-pearl hover:bg-red1 active:bg-red2 w-full text-base md:text-lg capitalize font-medium":
            variant === "primary-lg",
          "w-fit rounded px-6 py-3 text-sm font-bold transition-all duration-200 ease-in-out text-red bg-pearl hover:bg-[#e3d6c3] active:bg-[#ccc0af]":
            variant === "secondary",
        },
        className,
        disabled ? "disabled" : ""
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && <span>{icon}</span>} {children}
    </button>
  );
};
