// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Link } from "@evmosapps/i18n/client";
import { ComponentProps } from "react";
import cx from "clsx";
import { cn } from "helpers";

export const ButtonWithLink = ({
  className,
  ...props
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      className={cn(
        "w-fit flex justify-center self-start rounded bg-[#423D37] px-5 py-3 text-sm text-pearl transition-all duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]",
        className
      )}
      {...props}
    />
  );
};

export const ButtonWithoutLink = ({
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={cx(
        "w-fit self-start rounded bg-[#423D37] px-5 py-3 text-sm text-pearl transition-all duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]",
        className
      )}
      {...props}
    />
  );
};
