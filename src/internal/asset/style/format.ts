import { BigNumberish, utils } from "ethers";

export function getReservedForFee(
  amount: number,
  token: string,
  network: string
) {
  return `${amount} ${token} is reserved for transaction fees on the ${network} network.`;
}

export function convertFromAtto(
  value: BigNumberish | undefined,
  exponent = "18"
) {
  // Convert to string and truncate past decimal
  // for appropriate conversion
  if (!value) return 0;
  let valueAsString = value.toString();

  if (typeof value === "number") {
    // Strip scientific notation
    valueAsString = Number(value).toLocaleString("fullwide", {
      useGrouping: false,
    });
  }
  return Number(utils.formatUnits(valueAsString.split(".")[0], exponent));
}

export function formatNumber(
  value: string | number | undefined,
  options?: Intl.NumberFormatOptions,
  notation: "standard" | "compact" = "standard"
) {
  if (value === undefined) {
    return "--";
  }

  let valueAsNumber = value;

  if (typeof valueAsNumber === "string") {
    valueAsNumber = Number(valueAsNumber);
  }

  return new Intl.NumberFormat("en-US", {
    notation: notation,
    compactDisplay: "short",
    maximumFractionDigits: 4,
    ...options,
  }).format(valueAsNumber);
}
