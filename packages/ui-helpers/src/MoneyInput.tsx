// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ComponentProps, createContext, use, useEffect, useRef } from "react";
import { clamp, cn, useEffectEvent } from "helpers";
import { formatUnits, parseUnits } from "viem";
import { isUndefined } from "helpers";

/**
 * Formats live money input values
 * This function is meant to format the input value while the user is typing
 * while making sure it always outputs a valid amount while preserving the cursor position
 *
 * Formatting money input while it's being edited by the user is a bit tricky.
 * input values that would be considered "wrong" as a final value could be a valid intermediate value.
 * For example "123." might be a valid intermediate value, but it's not a valid final value.
 * also "." is not a valid final value, but it might be an indication that the user is still typing and intend to type
 * a decimal value below 1,
 *
 * We also want to preserve the cursor position
 *
 */
const formatMoneyInput = ({
  value,
  cursor,
  decimals = 18,
}: {
  value: string;
  cursor: number;
  decimals?: number;
}) => {
  /**
   * handle some special edge cases first
   */
  if (value === "") return { value: "0", cursor: 0, selectionLength: 1 };
  if (value === "." && cursor === 1)
    return { value: "0.0", cursor: 2, selectionLength: 1 };

  let outInteger = "";

  /**
   * Probably better if we treat the integer and fractional parts separately
   * So we split in the first decimal point
   */
  const decimalRegex = /[.,](.*)/s;
  const [integer = "", fractional] = value.split(decimalRegex);

  let isMoreThanZero = false;
  for (let i = 0; i < integer.length; i++) {
    const char = integer[i]!;
    if (!char.match(/[0-9]/)) {
      if (i < cursor) cursor--;
      continue;
    }
    /**
     * Ignore leading zeros
     **/
    if (isMoreThanZero === false && char === "0") {
      if (i <= cursor) cursor--;
      continue;
    }
    isMoreThanZero = true;
    outInteger += integer[i];
  }

  /**
   * let's make sure integer part is not empty
   */
  if (outInteger === "") {
    outInteger = "0";
    cursor++;
  }

  /**
   * if undefined, it means there is no decimal point
   * (which is different if the decimal point is at the end of the string)
   */
  if (isUndefined(fractional)) {
    return { value: outInteger, cursor, selectionLength: 1 };
  }
  let outFractional = "";

  for (let i = 0; i < fractional.length; i++) {
    const char = fractional[i]!;
    if (!char.match(/[0-9]/)) {
      if (i + outInteger.length < cursor) cursor--;
      continue;
    }
    if (outFractional.length >= decimals) {
      cursor = Math.min(outInteger.length + decimals + 1, cursor);
      break;
    }
    outFractional += fractional[i];
  }

  if (outFractional === "") {
    return { value: outInteger + ".0", cursor, selectionLength: 1 };
  }

  let out = `${outInteger}.${outFractional}`;
  /**
   * removing extra zeros at the end, but only if they are after the cursor
   */
  while (out[out.length - 1] === "0" && cursor < out.length) {
    if (out[out.length - 2] === ".") break;
    out = out.slice(0, -1);
  }

  return { value: out, cursor, selectionLength: 0 };
};

type MoneyInputProps = {
  decimals: number;
  onChange?: (value: bigint) => void;
  value: bigint;
  max?: bigint;
  min: bigint;
  disabled: boolean;
};

const MoneyInputContext = createContext<MoneyInputProps | null>(null);

const useMoneyInputContext = () => {
  const context = use(MoneyInputContext);
  if (!context) {
    throw new Error("MoneyInputContext not found");
  }
  return context;
};

export function MoneyInput({
  children,
  decimals = 18,
  onChange,
  value = 0n,
  max = 0n,
  min = 0n,
  disabled = false,
  className,
  ...rest
}: Omit<ComponentProps<"div">, keyof MoneyInputProps> &
  Partial<MoneyInputProps>) {
  return (
    <div className={cn("flex gap-x-2", className)} {...rest}>
      <MoneyInputContext.Provider
        value={{
          decimals,
          onChange,
          value,
          max,
          min,
          disabled,
        }}
      >
        {children}
      </MoneyInputContext.Provider>
    </div>
  );
}

MoneyInput.Input = function Input({
  className,
  ...rest
}: Omit<ComponentProps<"input">, "onChange" | "value" | "disable" | "onBlur">) {
  const { disabled, value, onChange, decimals, min, max } =
    useMoneyInputContext();
  const ref = useRef<HTMLInputElement>(null);

  const updateInput = useEffectEvent(() => {
    if (!ref.current) return;
    ref.current.value = formatUnits(value, decimals);
  });
  useEffect(() => {
    if (disabled) return;
    if (document.activeElement === ref.current) return;
    updateInput();
  }, [max, min, disabled, decimals, updateInput, value]);

  return (
    <input
      ref={ref}
      type="text"
      inputMode="decimal"
      pattern="[0-9]*(.[0-9]+)?"
      role="spinbutton"
      autoComplete="off"
      autoCorrect="off"
      className={cn(
        "text-right w-full font-bold font-display text-2xl bg-transparent outline-none",
        className,
      )}
      onFocus={(e) => {
        e.target.select();
      }}
      onChange={({ target }) => {
        const {
          value: inputValue,
          cursor,
          selectionLength,
        } = formatMoneyInput({
          value: target.value,
          cursor: target.selectionStart ?? 0,
          decimals,
        });

        target.value = inputValue;
        target.selectionStart = cursor;
        target.selectionEnd = cursor + selectionLength;

        const newValue = parseUnits(inputValue, decimals);
        if (newValue !== value) {
          onChange?.(newValue);
        }
      }}
      onBlur={(e) => {
        const newValue = clamp(value, min, max);
        e.target.value = formatUnits(newValue, decimals);
        if (newValue !== value) {
          onChange?.(newValue);
        }
      }}
      disabled={disabled}
      {...rest}
    />
  );
};

MoneyInput.MaxButton = function MaxButton({
  className,
  children = "Max",
  ...rest
}: ComponentProps<"button">) {
  const { max, onChange, disabled } = useMoneyInputContext();
  return (
    <button
      className={cn("text-sm font-bold p-2 border rounded", className)}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        onChange?.(max ?? 0n);
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
