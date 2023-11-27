// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import cx from "clsx";
import { ComponentProps } from "react";

export const Badge = ({
  variant = "info",
  className,
  ...rest
}: ComponentProps<"span"> & {
  variant?: "success" | "warning" | "danger" | "info" | "dark";
}) => {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-[10px] ring-1 ring-inset",
        {
          "text-green2 ring-lightGreen bg-lightYellow2": variant === "success",
          "ring-lightYellow bg-lightYellow1 text-brown": variant === "warning",
          "bg-red text-pearl ring-red": variant === "danger",
          // {/* TODO: add color to tailwind file */}
          "ring-darkGray300 text-[#FFF4E1]": variant === "info",
          "ring-[#FFF4E173] text-[#FFF4E1] text-lg tracking-wide px-5 py-2 font-bold cursor-pointer transition-color  duration-100 ease-in-out hover:bg-[#534d46] active:bg-[#666059]":
            variant === "dark",
        },
        className
      )}
      {...rest}
    />
  );
};
