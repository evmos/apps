// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ErrorIcon } from "@evmosapps/icons/ErrorIcon";
import { ComponentProps } from "react";

export function ErrorMessage({
  className,
  variant = "error",
  displayIcon = true,
  ...rest
}: ComponentProps<"p"> & {
  variant?: "error" | "info";
  displayIcon?: boolean;
}) {
  return (
    <div
      className={cn(
        "tracking-wider flex justify-start space-x-2 text-xxxs md:text-xs pl-4 mt-3",
        className,
        {
          "text-red-900": variant === "error",
          "text-purple-200": variant === "info",
        },
      )}
    >
      {displayIcon && <ErrorIcon />}
      <div {...rest} />
    </div>
  );
}
