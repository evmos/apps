// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

type ConfirmButtonProps = {
  text: string | JSX.Element;
} & ComponentProps<"button">;

export const ConfirmButton = ({
  text,
  onClick,
  disabled,
  className,
  ...rest
}: ConfirmButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className !== undefined ? className : "w-full"
        } bg-red-300 text-pearl hover:bg-red1 rounded px-8 py-2 text-base font-bold uppercase ${disabled ? "disabled" : ""
        }`}
      {...rest}
    >
      {text}
    </button>
  );
};
