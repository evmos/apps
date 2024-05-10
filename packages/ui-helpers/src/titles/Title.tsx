// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

import React from "react";
import { cn } from "helpers";

export const Title = ({
  variant = "lg",
  tag = "h1",
  className,
  children,
  ...rest
}: ComponentProps<"h1"> & {
  variant?: "lg" | "small" | "xl";
  tag?: "h1" | "h2" | "h3" | "h4";
}) => {
  return React.createElement(
    tag,
    {
      className: cn(
        "text-heading dark:text-heading-dark tracking-wide",
        {
          "text-2xl lg:text-3xl font-medium": variant === "xl",
          "text-xl lg:text-2xl tracking-wide": variant === "lg",
          "text-base lg:text-lg": variant === "small",
          ...rest,
        },
        className,
      ),
    },
    children,
  );
};
