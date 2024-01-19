// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { cn } from "helpers";
import { ComponentPropsWithRef } from "react";
export const PrimaryLink = ({
  href,
  children,
  variant = "primary",
  onClick,
  className,
  ...rest
}: ComponentPropsWithRef<"a"> & {
  href: string;
  variant?: "primary";
}) => {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      className={cn(
        variant === "primary"
          ? "text-red-300 transition-all duration-200 ease-in-out hover:text-[#f26850] active:text-[#f0735d]"
          : "",
        className,
      )}
      target="_blank"
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
};
