// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CheckIcon } from "@evmosapps/icons/CheckIcon";
import { ErrorIcon } from "@evmosapps/icons/ErrorIcon";
import { ComponentProps } from "react";
import { cn } from "helpers";

export const SetupStep = ({
  completed,
  error,
  ...rest
}: ComponentProps<"button"> & {
  completed?: boolean;
  error?: string;
}) => {
  return (
    <li
      className={cn(
        "flex items-center relative",
        "before:w-[1px]  before:left-[16px] before:absolute before:top-2/3 before:h-[150%] before:z-0 before:-translate-x-1/2 ",
        "before:last-of-type:hidden",
        {
          "before:bg-red-300": !completed,
          "before:bg-green1": completed,
        },
      )}
    >
      <span
        className={cn(
          "text-white rounded-full flex w-9 aspect-square items-center justify-center relative",
          {
            "ring-1 bg-white ring-red-300 disabled:brightness-90 before:bg-red-300":
              !completed,
            "bg-green1 before:bg-green1": completed,
          },
        )}
      >
        <CheckIcon
          className={cn({
            hidden: !completed,
          })}
        />
      </span>
      <div className="w-full relative">
        <button
          type="button"
          className={cn(
            "text-pearl ml-4 w-full space-x-2 rounded-lg px-8 py-2 text-base font-normal  normal-case shadow transition-all duration-150",
            "enabled:hover:shadow-md enabled:hover:brightness-90 ",
            {
              "bg-red-300 disabled:brightness-90": !completed,
              "bg-green1": completed,
            },
          )}
          {...rest}
        />
        {error && (
          <p className="text-red-300 ml-4 flex items-center space-x-2 text-xs absolute -bottom-6 w-full gap-x-2">
            <ErrorIcon />
            {error}
          </p>
        )}
      </div>
    </li>
  );
};
