// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ComponentProps, PropsWithChildren } from "react";

export const Container = ({
  className,
  full = false,
  ...rest
}: ComponentProps<"div"> & { full?: boolean }) => {
  return (
    <div
      className={cn("container mx-auto px-4", className, {
        "xl:max-w-full": full,
      })}
      {...rest}
    />
  );
};
