// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { VariantProps, cva } from "cva";
import { cn } from "helpers/src/classnames";
import { ElementType, createElement, forwardRef } from "react";

const chip = cva({
  base: [
    //default properties
    "flex tracking-wide items-center w-fit h-[28px] pl-[10px] pr-2 py-2 rounded-2xl text-sm gap-x-2 [&_.icon]:h-3 [&_.icon]:w-3",
    //opacity
    "bg-opacity-[0.08] dark:bg-opacity-[0.08]",
    //text color
    "text-on-surface-variant dark:text-on-surface-variant-dark",
    //background color
    "bg-on-surface dark:bg-on-surface-dark",
    //hover
    "hover:bg-opacity-[0.2] hover:dark:bg-opacity-[0.2]",
    //focus
    "focus:bg-opacity-[0.2] focus:dark:bg-opacity-[0.2]",
  ],
  variants: {
    variant: {
      neutral: [],
      success: [
        "bg-success-light dark:bg-success-dark text-success dark:text-success-dark",
      ],
      warning: [
        "bg-warning-light dark:bg-warning-dark text-warning dark:text-warning-dark",
      ],
      error: [
        "bg-error-light dark:bg-error-dark text-error dark:text-error-dark",
      ],
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export interface ChipStyleProps extends VariantProps<typeof chip> {}

export type ChipProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithRef<T> &
  ChipStyleProps;

function _Chips<T extends ElementType = "button">({
  as,
  className,
  children,
  ...props
}: ChipProps<T>) {
  return createElement(
    (as as string) ?? "button",
    {
      ...props,
      className: cn(chip(props), className as string),
    },
    <>{children}</>,
  );
}

export const Chip = forwardRef(_Chips) as <T extends ElementType = "button">(
  props: ChipProps<T>,
) => JSX.Element;
