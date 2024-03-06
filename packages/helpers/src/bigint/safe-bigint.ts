// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const safeBigInt = (value: string | number | bigint) => {
  if (typeof value === "string") {
    // ignores decimal points
    const [safe = "0"] = value.match(/^-?\d+/) ?? [];
    return BigInt(safe);
  }
  if (typeof value === "number") {
    return BigInt(Math.round(value));
  }
  return value;
};
