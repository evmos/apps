// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export function formatUnits(
  value: bigint,
  tokenDecimals: number,
  mode: "short" | "long" | number = "short"
) {
  let display = value.toString();

  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(tokenDecimals, "0");

  let [integer, fraction] = [
    display.slice(0, display.length - tokenDecimals),
    display.slice(display.length - tokenDecimals),
  ];
  if (mode === "long") {
    fraction = fraction.replace(/(0+)$/, "");
    return `${negative ? "-" : ""}${integer || "0"}${
      fraction ? `.${fraction}` : ""
    }`;
  }
  fraction = fraction.slice(0, typeof mode === "number" ? mode : 7);
  return `${negative ? "-" : ""}${integer || "0"}.${fraction}`;
}
