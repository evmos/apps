// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { cn } from "helpers/src/classnames";
import { ComponentProps, useEffect, useRef } from "react";

// TODO Mili: Remove this code and use the one from helpers. This is a temporary solution because it's giving me an error
import { useInsertionEffect, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export function useEffectEvent<T extends (...args: any[]) => unknown>(
  fn: T,
): T {
  const ref = useRef(fn);
  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((...args: Parameters<T>) => {
    return ref.current(...args);
  }, []) as T;
}

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
        // TODO Mili: for ring it doesn't take the right color
        "w-fit rounded-lg transition-all duration-200 p-3 focus:ring-1 focus:ring-primary dark:focus:ring-primary-dark focus-visible:ring-1 focus-visible:ring-primary dark:focus-visible:ring-primary-dark bg-transparent hover:bg-on-surface/10 dark:hover:bg-on-surface-dark/10 outline-none placeholder:text-subheading dark:placeholder:text-subheading-dark text-paragraph dark:text-paragraph-dark border border-surface-container-highest dark:border-surface-container-highest-dark",
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
