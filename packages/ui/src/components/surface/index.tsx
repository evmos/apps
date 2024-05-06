// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cva, VariantProps } from "cva";
import { cn } from "helpers";
import omit from "lodash-es/omit";
import { ComponentProps, createElement, ForwardedRef, forwardRef } from "react";

const surface = cva({
  base: [
    "flex flex-col",
    "rounded-xl",
    "border",
    "border-surface-container-lowest dark:border-surface-container-lowest-dark",
    "bg-surface dark:bg-surface-dark",
  ],

  variants: {
    lowest: {
      true: [
        "bg-surface-container-lowest dark:bg-surface-container-lowest-dark",
        "border-transparent dark:border-transparent",
      ],
    },
    low: {
      true: [
        "bg-surface-container-low dark:bg-surface-container-low-dark",
        "border-transparent dark:border-transparent",
      ],
    },
    base: {
      true: [
        "bg-surface-container dark:bg-surface-container-dark",
        "border-transparent dark:border-transparent",
      ],
    },
    high: {
      true: [
        "bg-surface-container-high dark:bg-surface-container-high-dark",
        "border-transparent dark:border-transparent",
      ],
    },
    highest: {
      true: [
        "bg-surface-container-highest dark:bg-surface-container-highest-dark",
        "border-transparent dark:border-transparent",
      ],
    },

    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    rounded: "xl",
  },
});
export interface SurfaceStyleProps extends VariantProps<typeof surface> { }

export type SurfaceProps = ComponentProps<"div"> &
  SurfaceStyleProps & { as?: string };

export const Surface = forwardRef(function _Surface(
  { as = "div", className, ...props }: SurfaceProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return createElement(as, {
    ...omit(props, ["lowest", "low", "high", "highest", "rounded"]),
    ref,
    className: cn(surface(props), className),
  });
});
