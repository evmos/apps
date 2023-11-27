"use client";
import {
  ComponentProps,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  ComponentRef,
} from "react";
import { formatUnits, parseUnits } from "viem";
import { cn, clamp, E } from "helpers";
import cx from "clsx";

export const AmountInput = ({
  value,
  decimals,
  onChange,
  max,
  min = 0n,
  className,
  maxButtonClassName,
  setIsMaxClicked,
  variant = "default",
  ...props
}: Omit<ComponentProps<"input">, "value" | "onChange" | "max" | "min"> & {
  maxButtonClassName?: string;
  decimals?: number | string;
  onChange?: (value: bigint) => void;
  value?: bigint;
  max?: bigint;
  min?: bigint;
  setIsMaxClicked?: Dispatch<SetStateAction<boolean>>;
  variant?: "default" | "error" | "info";
}) => {
  const decimalsUnit = parseInt(String(decimals ?? 18));

  const ref = useRef<ComponentRef<"input">>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current === document.activeElement) return;
    ref.current.value = formatUnits(value ?? 0n, decimalsUnit);
  }, [value, decimalsUnit]);

  return (
    <div
      className={cx(
        "flex w-full tracking-wider font-bold py-2 pl-4 pr-2 text-sm md:text-base leading-5 text-gray-900 focus:ring-1 border-2 border-pink-300 rounded bg-pink-200 text-black focus-visible:outline-none",
        {
          "bg-pink-700": variant === "error",
          "bg-purple-200": variant === "info",
        }
      )}
    >
      <input
        ref={ref}
        className={cx(
          "w-full border-none bg-pink-200 focus-visible:outline-none",
          {
            "bg-pink-700": variant === "error",
            "bg-purple-200": variant === "info",
          },
          className
        )}
        onChange={({ target }) => {
          target.value = target.value.replace(/^(0+)(?=[1-9])/, "");
          const [decimal, fractional] = target.value.split(".");
          target.value =
            decimal + (fractional !== undefined ? "." + fractional : "");

          const [error, parsed] = E.try(() =>
            parseUnits(target.value, decimalsUnit)
          );

          if (error) {
            return;
          }
          let amount = parsed;
          if (max || min) {
            amount = clamp(amount, min ?? 0n, max ?? amount);
          }
          if (amount !== value) {
            onChange?.(amount);
          }
        }}
        onBlur={({ target }) => {
          target.value = formatUnits(value ?? 0n, decimalsUnit);
        }}
        inputMode="decimal"
        type="text"
        pattern="[0-9]*(.[0-9]+)?"
        role="spinbutton"
        autoComplete="off"
        autoCorrect="off"
        {...props}
      />
      {max !== undefined && (
        <button
          className={cn(
            "py-2 px-2.5 leading-none rounded-md bg-pink-400 text-black-900 text-xs md:text-sm tracking-wider font-light",
            maxButtonClassName
          )}
          onClick={(e) => {
            e.preventDefault();

            onChange?.(max ?? 0n);
            setIsMaxClicked && setIsMaxClicked(true);
          }}
        >
          Max.
        </button>
      )}
    </div>
  );
};
