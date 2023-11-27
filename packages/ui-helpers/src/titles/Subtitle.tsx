// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import cx from "clsx";

export const Subtitle = ({
  variant = "default",
  ...rest
}: ComponentProps<"h2"> & {
  variant?: "default";
}) => {
  return (
    <h5
      className={cx("", {
        // {/* TODO: add color to tailwind file */}
        "text-xl tracking-wide text-white/70 font-light": variant === "default",
      })}
      {...rest}
    />
  );
};
