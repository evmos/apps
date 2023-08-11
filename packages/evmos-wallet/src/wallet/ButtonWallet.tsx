// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import cx from "clsx";

export const ButtonWallet = ({
  className,
  disabled,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={cx(
        className,
        "flex w-full px-4 py-3",
        "hover:bg-grayOpacity hover:shadow-md",
        "border-darkPearl shadow rounded border",
        "capitalize items-center space-x-3 text-sm font-bold",
        "transition-all duration-300",
        {
          disabled: disabled,
        }
      )}
      {...props}
    />
  );
};

export default ButtonWallet;
