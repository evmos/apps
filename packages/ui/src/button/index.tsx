// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cva, VariantProps } from "cva";
import { cn } from "helpers/src/classnames";
import { createElement, ElementType, forwardRef } from "react";

const button = cva({
  base: [
    "rounded-full hover:brightness-110 focus:brightness-110 outline-offset-2 transition-[background-color,outline-color,filter] transition-200 ",
    "outline outline-offset-2 outline-2 outline-tertiary-container/0 dark:outline-tertiary-container-dark/0 focus:outline-tertiary-container dark:focus:outline-tertiary-container-dark",
    "border border-2 border-transparent",
  ],
  variants: {
    variant: {
      primary: [
        "bg-primary-container dark:bg-primary-container-dark",
        "text-on-primary-container dark:text-on-primary-container-dark",
      ],
    },
    outlined: { true: "bg-transparent dark:bg-transparent border-current dark:border-current" },
    size: {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    },
  },
    compoundVariants: [
    {
      variant: "primary",
      outlined: true,
      class: "text-primary dark:text-primary-dark",
    },
  ],
  defaultVariants: {
    variant: "primary",
    outlined: false,
    size: "md",
  },
});

export interface ButtonStyleProps extends VariantProps<typeof button> { }

export type ButtonProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & React.ComponentPropsWithRef<T> &
  ButtonStyleProps;

function _Button<T extends ElementType = "button">({
  as,
  className,
  ...props
}: ButtonProps<T>) {
  return createElement((as as string) ?? "button", {
    ...props,
    className: cn(button(props), className as string),
  });
}
export const Button = forwardRef(_Button) as <T extends ElementType = "button">(
  props: ButtonProps<T>,
) => JSX.Element;
