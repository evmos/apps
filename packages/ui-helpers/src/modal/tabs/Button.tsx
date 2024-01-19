// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TabProps } from "./types";
import cx from "clsx";
import { IconContainer } from "../../IconContainer";
import { ICONS_TYPES } from "constants-helper";
import { ComponentProps } from "react";

export const Button = ({
  tab,
  variant,
  ...props
}: {
  tab: TabProps;
  variant: string;
} & ComponentProps<"button">) => {
  return (
    <button
      type="button"
      onClick={tab.onClick}
      disabled={tab.disabled}
      className={cx(
        "flex items-center justify-center gap-1 rounded-md py-1 px-3",
        {
          "border-red-300 border-2":
            variant === "default" && tab.option === tab.type,
          "border-strokeGrey border":
            variant === "default" && tab.option !== tab.type,
          "border-[#FFA1A1] h-8 px-2 border-2 bg-[#FF9E90] shadow-custom-pink text-black font-medium":
            variant === "pink" && tab.option === tab.type,
          "bg-pink-200 text-black font-light h-8 px-2":
            variant === "pink" && tab.option !== tab.type,
          "border-[#FFA1A1] border-2 bg-[#FF9E90] shadow-custom-pink text-black font-medium md:h-11 md:w-11 h-9 w-9":
            variant === "pink-small" && tab.option === tab.type,
          "bg-pink-200 text-black font-light h-9 w-9 md:h-11 md:w-11":
            variant === "pink-small" && tab.option !== tab.type,
          disabled: tab.disabled,
        },
      )}
      {...props}
    >
      {tab.icon} {tab.text}
      {tab.option === tab.type && variant === "default" && (
        <IconContainer type={ICONS_TYPES.CHECK} />
      )}
    </button>
  );
};
