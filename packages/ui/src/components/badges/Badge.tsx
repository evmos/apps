// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Badge = ({ ...rest }: ComponentProps<"span">) => {
  return (
    <span
      className="w-fit px-1.5 py-0.5 bg-tertiary-container dark:bg-tertiary-container-dark rounded
       text-on-tertiary-container dark:text-on-tertiary-container-dark text-xs leading-none"
      {...rest}
    />
  );
};
