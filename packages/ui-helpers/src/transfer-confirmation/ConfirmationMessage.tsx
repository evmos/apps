// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export function ConfirmationMessage({ ...rest }: ComponentProps<"p"> & {}) {
  return (
    <p
      className="text-xxs md:text-xs tracking-wider text-gray-300 text-center font-normal"
      {...rest}
    />
  );
}
