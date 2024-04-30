// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const Label = ({ ...rest }: ComponentProps<"label">) => {
  return (
    <label
      className="font-medium text-heading dark:text-heading-dark leading-5"
      {...rest}
    />
  );
};
