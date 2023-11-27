// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PropsWithChildren } from "react";
import cx from "clsx";

export const Title = ({
  variant = "h1",
  ...rest
}: PropsWithChildren<{
  variant?: "h1" | "small";
}>) => {
  return (
    <h1
      className={cx("text-[#E8DFD3] tracking-wide", {
        // {/* TODO: add color to tailwind file */}
        "text-5xl tracking-wide": variant === "h1",
        "text-3xl": variant === "small",
      })}
      {...rest}
    />
  );
};
