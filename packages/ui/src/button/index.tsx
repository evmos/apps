// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cva, VariantProps } from "cva";
import { cn } from "helpers/src/classnames";
import omit from "lodash-es/omit";
import React, { ForwardedRef } from "react";
import { createElement, ElementType, forwardRef } from "react";

const button = cva({
  base: [
    "rounded-full transition-[background-color,outline-color,filter] transition-200 flex gap-x-1",
    // outline focus ring
    "outline outline-offset-2 outline-1 outline-secondary-container/0 dark:outline-secondary-container-dark/0 focus:outline-secondary-container dark:focus:outline-secondary-container-dark",
    // border for outline version, let's always add that as transparent so sizing is consistent
    "border border-transparent",
    // spec uses a separate element with low opacity as hover instead of changing the color
    // we could add a hover color to our palette but we'd need to add for all variants
    "relative",
    "before:content-[''] before:absolute before:inset-0 before:rounded-full before:transition-opacity before:duration-200 before:opacity-0",
    // disabled styles are almost the same for all variants
    "dark:disabled:bg-on-surface-dark/10 disabled:bg-on-surface/10 dark:disabled:text-on-surface-dark/40 disabled:text-on-surface/40",
    "justify-center items-center",
  ],
  variants: {
    size: {
      sm: "px-3 py-[7px]  text-xs min-w-7",
      md: "px-4 py-[9px] text-base min-w-9",
      lg: "px-5 py-[13px] text-lg min-w-[46px]",
    },
    variant: {
      primary: [
        "bg-primary-container dark:bg-primary-container-dark",
        "text-on-primary-container dark:text-on-primary-container-dark",
        "before:bg-on-primary-container/10 dark:before:bg-on-primary-container-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],
      secondary: [
        "bg-secondary dark:bg-secondary-dark",
        "text-on-secondary dark:text-on-secondary-dark",
        "before:bg-on-secondary/10 dark:before:bg-on-secondary-container-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],
      tertiary: [
        "bg-tertiary-container dark:bg-tertiary-container-dark",
        "text-on-tertiary-container dark:text-on-tertiary-container-dark",
        "before:bg-on-tertiary-container/10 dark:before:bg-on-tertiary-container-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],
      ["low-emphasis"]: [
        "bg-surface-container-highest dark:bg-surface-container-highest-dark",
        "text-on-surface-container-highest dark:text-on-surface-container-highest-dark",
        "before:bg-on-surface-container-highest/10 dark:before:bg-on-surface-container-highest-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],

      danger: [
        "bg-error-container dark:bg-error-container-dark",
        "text-on-error-container dark:text-on-error-container-dark",
        "before:bg-on-error-container/10 dark:before:bg-on-error-container-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],
    },
    outlined: {
      true: "bg-transparent dark:bg-transparent",
    },
    ghost: {
      true: "bg-transparent dark:bg-transparent",
    },

    tight: {
      true: "bg-transparent dark:bg-transparent disabled:bg-transparent disabled:dark:bg-transparent py-0 px-1 hover:before:hidden focus:before:hidden border-0",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      outlined: true,
      class:
        "text-primary dark:text-primary-dark [&:not(:disabled)]:border-current",
    },
    {
      variant: "primary",
      ghost: true,
      class: "text-primary dark:text-primary-dark",
    },
    {
      variant: "primary",
      tight: true,
      class:
        "text-primary dark:text-primary-dark disabled:text-primary/40 disabled:dark:text-primary-dark/40",
    },

    {
      variant: "secondary",
      outlined: true,
      class:
        "text-secondary dark:text-secondary-dark [&:not(:disabled)]:border-current",
    },
    {
      variant: "secondary",
      ghost: true,
      class: "text-secondary dark:text-secondary-dark",
    },
    {
      variant: "secondary",
      tight: true,
      class:
        "text-secondary dark:text-secondary-dark disabled:text-secondary/40 disabled:dark:text-secondary-dark/40",
    },

    {
      variant: "tertiary",
      outlined: true,
      class:
        "text-tertiary dark:text-tertiary-dark [&:not(:disabled)]:border-current",
    },
    {
      variant: "tertiary",
      ghost: true,
      class: "text-tertiary dark:text-tertiary-dark",
    },
    {
      variant: "tertiary",
      tight: true,
      class:
        "text-tertiary dark:text-tertiary-dark disabled:text-tertiary/40 disabled:dark:text-tertiary-dark/40",
    },

    {
      variant: "low-emphasis",
      outlined: true,
      class:
        "dark:[&:not(:disabled)]:border-surface-container-highest-dark [&:not(:disabled)]:border-surface-container-highest",
    },

    {
      variant: "danger",
      outlined: true,
      class:
        "text-error dark:text-error-container-dark [&:not(:disabled)]:border-current",
    },
    {
      variant: "danger",
      ghost: true,
      class: "text-error dark:text-error-container-dark",
    },

    {
      variant: "danger",
      tight: true,
      class:
        "text-error dark:text-error-container-dark disabled:text-error/40 disabled:dark:text-error-container-dark/40",
    },
  ],
  defaultVariants: {
    variant: "primary",
    outlined: false,
    size: "md",
    tight: false,
  },
});

export interface ButtonStyleProps extends VariantProps<typeof button> { }

export type ButtonProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithRef<T> &
  ButtonStyleProps;

function _Button<T extends ElementType = "button">(
  { as, className, ...props }: ButtonProps<T>,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement((as as string) ?? "button", {
    ...omit(props, ["variant", "size", "outlined", "tight", "ghost"]),
    ref,
    className: cn(button(props), className as string),
  });
}

type ButtonType = <T extends ElementType = "button">(
  props: ButtonProps<T>,
) => JSX.Element;
export const Button = forwardRef(_Button) as ButtonType;
// Button.Icon = IconButton;
