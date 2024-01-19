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
        "inline-flex items-center rounded-full px-2 py-1 text-[10px] transition-all duration-300 ease-in-out",
        {
          "text-green2 border border-lightGreen bg-lightYellow2 px-3":
            variant === "success",
          "border border-lightYellow bg-lightYellow1 text-brown":
            variant === "warning",
          "bg-red-300 text-pearl border border-red-300": variant === "danger",
          "bg-black-500 border-black-200 border text-pearl": variant === "info",
          "border border-black-300 bg-black-500 text-pearl text-xs md:text-sm tracking-wide px-2 md:px-4 py-1.5 font-bold cursor-pointer transition-color duration-100 ease-in-out hover:bg-black-100 active:bg-black-100":
            variant === "dark",
        },
        className,
      )}
      {...rest}
    />
  );
};
