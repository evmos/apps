// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers/src/classnames";
import { omit } from "lodash-es";
import React from "react";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

export function InputGroup({
  className,
  children,
  disabled,
  ...props
}: ComponentProps<"div"> & { disabled?: boolean }) {
  return (
    <div
      className={cn(
        `relative flex border focus-within:border-primary  focus-within:dark:border-primary-dark h-11 items-stretch rounded-lg`,
        `transition-colors duration-200 ease-in-out`,
        "focus-within:bg-on-surface/20 dark:focus-within:bg-on-surface-dark/20",
        {
          "opacity-25": disabled,
          "hover::bg-on-surface/10 dark:hover:bg-on-surface-dark/10 hover:focus-within:bg-on-surface/20 dark:hover:focus-within:bg-on-surface-dark/20":
            !disabled,
        },
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            disabled,
          } as {});
        }
        return child;
      })}
    </div>
  );
}

const Input = forwardRef(function _Input(
  { className, ...props }: ComponentProps<"input">,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      autoComplete="off"
      className={cn(
        `w-full font-body bg-transparent active:outline-none border-none focus:outline-none first:pl-4 placeholder-subheading dark:placeholder-subheading-dark`,
        "text-paragraph dark:text-paragraph-dark",
        className,
      )}
      {...omit(props, ["setIsFocused"])}
    />
  );
});

InputGroup.Input = Input;

const InputSection = forwardRef(function _InputSection(
  { className, ...props }: ComponentProps<"div">,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={cn(
        `flex items-center px-3 ${className} [&_.icon]:h-5 [&_.icon]:w-5`,
      )}
      {...props}
    />
  );
});

InputGroup.Section = InputSection;
