// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { cn } from "helpers/src/classnames";
import { ComponentProps, useEffect, useRef } from "react";
import { useEffectEvent } from "helpers/src/hooks";

export function Input({
  className,
  value,
  fullWidth,
  ...rest
}: Omit<ComponentProps<"input">, "disable" | "onBlur"> & {
  fullWidth?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const updateInput = useEffectEvent(() => {
    if (!ref.current) return;
    if (!value) return;
    ref.current.value = value as string;
  });
  useEffect(() => {
    if (document.activeElement === ref.current) return;
    updateInput();
  }, [updateInput, value]);

  return (
    <input
      ref={ref}
      type="text"
      role=""
      autoComplete="off"
      autoCorrect="off"
      className={cn(
        "w-fit rounded-lg transition-all duration-200 p-2 focus:ring-1 focus:ring-primary dark:focus:ring-primary-dark focus-visible:ring-1",
        "focus-visible:ring-primary outline-none dark:focus-visible:ring-primary-dark bg-transparent hover:bg-on-surface/10 dark:hover:bg-on-surface-dark/10",
        "placeholder:text-subheading dark:placeholder:text-subheading-dark text-paragraph dark:text-paragraph-dark",
        "input-wallets border-surface-container-highest dark:border-surface-container-highest-dark",
        {
          "w-full": fullWidth,
        },
        className,
      )}
      onFocus={(e) => {
        e.target.select();
      }}
      {...rest}
    />
  );
}
