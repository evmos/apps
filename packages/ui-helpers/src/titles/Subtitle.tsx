// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

import { cn } from "helpers";

export const Subtitle = ({
  variant = "default",
  className,
  ...rest
}: ComponentProps<"h2"> & {
  variant?: "default";
}) => {
  return (
    <h5
      className={cn(
        "tracking-wide font-light text-sm md:text-base",
        {
          " text-white/70 ": variant === "default",
        },
        className,
      )}
      {...rest}
    />
  );
};
