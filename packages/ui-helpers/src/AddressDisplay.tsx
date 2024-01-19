// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";

export const AddressDisplay = ({
  address,
  fallback,
  maxLength = 12,
  ...rest
}: {
  address?: string;
  fallback?: string;
  maxLength?: number;
} & ComponentProps<"span">) => {
  if (!address) return fallback;
  if (address.startsWith("0x")) {
    const tailLength = maxLength - 6 - 3;
    return (
      <span title={address} {...rest}>{`0x${address.slice(
        2,
        6,
      )}…${address.slice(-tailLength)}`}</span>
    );
  }

  const [prefix = "", tail = ""] = address.split("1");
  const tailLength = maxLength - prefix.length - 3;
  return (
    <span title={address} {...rest}>{`${prefix}…${tail.slice(
      -tailLength,
    )}`}</span>
  );
};
