// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Badge = ({ ...rest }: ComponentProps<"span">) => {
  return (
    <span
      className="w-fit px-1.5 py-0.5 bg-surface-container-high dark:bg-surface-container-high-dark rounded text-paragraph dark:text-paragraph-dark text-xs leading-none"
      {...rest}
    />
  );
};
