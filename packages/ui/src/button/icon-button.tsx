// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cva, VariantProps } from "cva";
import { cn } from "helpers/src/classnames";
import React, { ForwardedRef } from "react";
import { createElement, ElementType, forwardRef } from "react";

const button = cva({
  base: [
    "rounded-full transition-[background-color,outline-color,filter] transition-200 flex gap-x-1",
    // border for outline version, let's always add that as transparent so sizing is consistent
    "border border-transparent",
    "relative",
    "before:content-[''] before:block before:absolute before:-inset-0.5 before:rounded-full focus:before:rounded-md before:transition-opacity before:duration-200 before:opacity-0",
    // outline focus ring
    "before:outline before:outline-offset-2 before:outline-1 before:outline-secondary-container/0 before:dark:outline-secondary-container-dark/0 focus:before:outline-secondary-container dark:focus:before:outline-secondary-container-dark",

    // disabled styles are almost the same for all variants
    "dark:disabled:bg-transparent disabled:bg-transparent disabled:border-none dark:disabled:text-on-surface-dark/40 disabled:text-on-surface/40",
    "justify-center items-center aspect-square",
  ],
  variants: {
    size: {
      sm: "w-8 [&_.icon]:h-4 [&_.icon]:w-4",
      md: "w-11 [&_.icon]:h-5 [&_.icon]:w-5",
      lg: "w-14 [&_.icon]:h-6 [&_.icon]:w-6",
    },
    variant: {
      primary: [
        "bg-primary-container dark:bg-primary-container-dark",

        "text-on-primary-container dark:text-on-primary-container-dark",
        "before:bg-on-primary-container/10 dark:before:bg-on-primary-container-dark/10",
        "focus:before:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],
      secondary: [
        "bg-secondary-container dark:bg-secondary-container-dark",
        "text-on-secondary-container dark:text-on-secondary-container-dark",
        "before:bg-on-secondary/10 dark:before:bg-on-secondary-container-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],
      tertiary: [
        "bg-tertiary-container dark:bg-tertiary-container-dark",
        "text-on-tertiary-container dark:text-on-tertiary-container-dark",
        "before:bg-on-tertiary/10 dark:before:bg-on-tertiary-container-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],

      ["low-emphasis"]: [
        "bg-surface-container-highest dark:bg-surface-container-highest-dark",
        "text-on-surface dark:text-on-surface-dark",
        "before:bg-on-surface/10 dark:before:bg-on-surface-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],

      danger: [
        "bg-error-container dark:bg-error-container-dark",
        "text-on-error-container dark:text-on-error-container-dark",
        "before:bg-on-error-container/10 dark:before:bg-on-error-container-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],
      success: [
        "bg-success-container dark:bg-success-container-dark",
        "text-on-success-container dark:text-on-success-container-dark",
        "before:bg-on-success-container/10 dark:before:bg-on-success-container-dark/10",
        "before:focus:opacity-100 [&:not(:disabled)]:before:hover:opacity-100",
      ],
    },
    outlined: {
      true: "bg-transparent dark:bg-transparent text-on-surface-variant dark:text-on-surface-variant-dark",
    },
    ghost: {
      true: "bg-transparent dark:bg-transparent text-on-surface-variant dark:text-on-surface-variant-dark",
    },
    rect: {
      true: "rounded-lg before:rounded-lg",
    },
    tight: {
      true: [
        "bg-transparent dark:bg-transparent w-auto text-on-surface-variant border-0",
        "before:inset-0 before:rounded-full focus:before:rounded-full",
        "dark:text-on-surface-variant-dark disabled:before:hidden disabled:bg-transparent dark:disabled:bg-transparent",
      ],
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      outlined: true,
      class: "border-primary-container dark:border-primary-container-dark",
    },
    {
      variant: "secondary",
      outlined: true,
      class: "border-secondary-container dark:border-secondary-container-dark",
    },
    {
      variant: "tertiary",
      outlined: true,
      class: "border-tertiary-container dark:border-tertiary-container-dark",
    },
    {
      variant: "low-emphasis",
      outlined: true,
      class:
        "border-surface-container-highest dark:border-surface-container-highest-dark",
    },
    {
      variant: "danger",
      outlined: true,
      class: "border-error dark:border-error-container-dark",
    },
    {
      variant: "success",
      outlined: true,
      class: "border-success-container dark:border-success-container-dark",
    },

    {
      variant: "danger",
      ghost: true,
      class: "text-error dark:text-error-container-dark",
    },

    {
      variant: "success",
      ghost: true,
      class: "text-success dark:text-success-container-dark",
    },
    {
      variant: "danger",
      tight: true,
      class: "text-error dark:text-error-container-dark",
    },
    {
      variant: "success",
      tight: true,
      class: "text-success dark:text-success-container-dark",
    },
  ],
  defaultVariants: {
    variant: "primary",
    outlined: false,
    size: "md",
    tight: false,
  },
});

export interface IconButtonStyleProps extends VariantProps<typeof button> { }

export type IconButtonProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithRef<T> &
  IconButtonStyleProps;

function _IconButton<T extends ElementType = "button">(
  { as, className, ...props }: IconButtonProps<T>,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement((as as string) ?? "button", {
    ...props,
    ref,
    className: cn(button(props), className as string),
  });
}

export const IconButton = forwardRef(_IconButton) as <
  T extends ElementType = "button",
>(
  props: IconButtonProps<T>,
) => JSX.Element;
