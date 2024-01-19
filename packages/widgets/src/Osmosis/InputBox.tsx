// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { FunctionComponent, HTMLInputTypeAttribute, useState } from "react";
import { Optional } from "utility-types";
import AutosizeInput from "react-input-autosize";

interface InputProps<T> {
  currentValue: string;
  onInput: (value: T) => void;
  autoFocus?: boolean;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: T;
}

interface Props extends Optional<InputProps<string>> {
  style?: "no-border" | "enabled" | "active" | "error";
  type?: HTMLInputTypeAttribute;
  trailingSymbol?: string;
  inputClassName?: string;
  isAutosize?: boolean;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  currentValue: string;
  setCurrentValue: (value: number) => void;
  setManualValue: (value: string) => void;
  className?: string;
}
const preventKeyboardEvents = (e: KeyboardEvent) => {
  if (e.key === "-" || e.key == ".") {
    e.preventDefault();
  }
};
export const InputBox: FunctionComponent<Props> = ({
  type,
  currentValue,
  setManualValue: setValue,
  setCurrentValue,
  onFocus,
  onBlur,
  style = "enabled",
  inputClassName,
  className,
  inputRef,
  autoFocus,
}) => {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div
      className={cn(
        "flex h-fit w-full flex-nowrap justify-between rounded-lg bg-osmoverse-1000 px-2 text-white-high",
        {
          border: style !== "no-border",
          "border-osmoverse-200":
            style !== "no-border" && (style === "active" || inputFocused),
          "border-osmoverse-1000":
            style !== "no-border" && style === "enabled" && !inputFocused,
          "border-missionError": style === "error",
        },
        className,
      )}
    >
      <label
        className="flex w-full shrink grow items-center"
        htmlFor="text-input"
      >
        <AutosizeInput
          inputRef={(ref: HTMLInputElement | null) => {
            if (inputRef) {
              inputRef.current = ref;
            }
          }}
          type={type}
          inputClassName={inputClassName}
          minWidth={0}
          // @ts-expect-error keyboardEvent
          onKeyDown={preventKeyboardEvents}
          value={currentValue}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            setCurrentValue(Number(e.target.value));
          }}
          onBlur={onBlur}
          onFocus={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputFocused(true);
            setCurrentValue(Number(e.target.value));
            onFocus && onFocus(e);
          }}
          autoFocus={autoFocus}
        />
      </label>
    </div>
  );
};
