// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ComponentProps } from "react";

export const EcosystemCardGrid = ({
  className,
  ...rest
}: ComponentProps<"section">) => {
  return (
    <section
      className={cn(
        "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
      {...rest}
    />
  );
};
