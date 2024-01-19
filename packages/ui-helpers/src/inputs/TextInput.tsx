// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CopyPasteIcon } from "@evmosapps/icons/CopyPasteIcon";
import { ComponentProps } from "react";
import { IconContainer } from "../IconContainer";
import { cn } from "helpers";

export function TextInput({
  showCopyIcon = false,
  extensionIcon,
  placeholder = "",
  onClickCopy,
  className,
  ...rest
}: {
  showCopyIcon?: boolean;
  extensionIcon?: string;
  placeholder?: string;
  onClickCopy?: () => void;
} & ComponentProps<"input">) {
  return (
    <div className="w-full rounded-md text-[#EFEFEF] font-medium bg-gray-500 py-4 px-4 text-xxs md:text-xs flex justify-between items-center space-x-2">
      {extensionIcon && (
        <div className="w-auto h-4 flex items-center">
          <IconContainer type={extensionIcon} />
        </div>
      )}
      <input
        className={cn(
          "w-full bg-transparent focus-visible:outline-none placeholder:text-gray-400 placeholder:font-normal",
          className,
        )}
        placeholder={placeholder}
        {...rest}
      />
      {showCopyIcon && (
        <button
          aria-label="Copy to clipboard"
          type="button"
          className={
            "w-auto h-4 flex items-center active:transform active:scale-75 active:duration-300"
          }
          onClick={async () => {
            await navigator.clipboard.writeText(rest.value as string);
            onClickCopy && onClickCopy();
          }}
        >
          <CopyPasteIcon />
        </button>
      )}
    </div>
  );
}
