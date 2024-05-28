// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import React from "react";
import { ComponentProps } from "react";

export const EcosystemCardGrid = ({
  className,
  ...rest
}: ComponentProps<"section"> & { children: React.ReactNode }) => {
  return (
    <section
      className={cn(
        "grid gap-4  grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 mb-10",
        className,
      )}
      {...rest}
    ></section>
  );
};
