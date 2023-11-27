// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PropsWithChildren } from "react";
import cx from "clsx";

export const Title = ({
  variant = "default",
  children,
  icon,
}: PropsWithChildren<{
  variant?: "default" | "modal-black";
  icon?: JSX.Element;
}>) => {
  return (
    <h1
      className={cx("flex items-center gap-2", {
        "text-lg md:text-xl  tracking-wider": variant === "modal-black",
        "font-bold": variant === "default",
      })}
    >
      {icon} {children}
    </h1>
  );
};
