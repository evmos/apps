// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { VariantProps, cva } from "cva";
import { cn } from "helpers/src/classnames";
import { ElementType, createElement, forwardRef } from "react";

const chip = cva({
  base: [
    "flex items-center w-fit h-[28px] pl-[10px] pr-2 py-2 rounded-2xl text-sm gap-x-2",
  ],
  variants: {
    // size: {
    //   sm: "",
    //   md: "w-11 [&_.icon]:h-5 [&_.icon]:w-5",
    //   lg: "w-14 [&_.icon]:h-6 [&_.icon]:w-6",
    // },
    variant: {
      trailing: [
        "bg-on-surface dark:bg-on-surface-dark [&_.icon]:h-3 [&_.icon]:w-3",
      ],
    },
    default: {
      true: "bg-opacity-[0.08] dark:bg-opacity-[0.08] text-on-surface-variant dark:text-on-surface-variant-dark",
    },
    hover: {
      true: "bg-opacity-[0.2] dark:bg-opacity-[0.2]",
    },
    focus: {
      true: "bg-opacity-[0.2] dark:bg-opacity-[0.2]",
    },
    Success: {
      true: "bg-success-light dark:bg-success-dark text-success dark:text-success-dark",
    },
    Warning: {
      true: "bg-warning-light dark:bg-warning-dark text-warning dark:text-warning-dark",
    },
    Error: {
      true: "bg-error-light dark:bg-error-dark text-error dark:text-error-dark",
    },
  },
});

export interface ChipStyleProps extends VariantProps<typeof chip> {}

export type ChipProps<T extends ElementType> = {
  as?: T;
  className?: string;
  text: string;
} & React.ComponentPropsWithRef<T> &
  ChipStyleProps;

function _Chips<T extends ElementType = "button">({
  as,
  className,
  text,
  children,
  ...props
}: ChipProps<T>) {
  return createElement(
    (as as string) ?? "button",
    {
      ...props,
      className: cn(chip(props), className as string),
    },
    <>
      {text}
      {children}
    </>,
  );
}

export const Chip = forwardRef(_Chips) as <T extends ElementType = "button">(
  props: ChipProps<T>,
) => JSX.Element;
