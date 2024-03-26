// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Chip = ({
  icon,
  children,
  ...rest
}: ComponentProps<"span"> & { icon?: JSX.Element }) => {
  return (
    <span
      className="flex items-center w-fit px-3 py-1 bg-surface-container-high dark:bg-surface-container-high-dark rounded-2xl text-on-surface-variant dark:text-paragraph-dark text-sm leading-none"
      {...rest}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </span>
  );
};
