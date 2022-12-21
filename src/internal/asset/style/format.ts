import { BigNumber, utils } from "ethers";

export function getReservedForFeeText(
  amount: BigNumber,
  token: string,
  network: string
) {
  return `${amount.toString()} ${token} is reserved for transaction fees on the ${network} network.`;
}

export function safeSubstraction(amount: BigNumber, fee: BigNumber) {
  const substraction = amount.sub(fee);
  if (substraction.lte(0)) {
    return BigNumber.from(0);
  }
  return substraction;
}

export function convertFromAtto(value: BigNumber, exponent = 18) {
  // Convert to string and truncate past decimal
  // for appropriate conversion
  if (!value) return "0";
  let valueAsString = value.toString();

  if (typeof value === "number") {
    // Strip scientific notation
    valueAsString = Number(value).toLocaleString("fullwide", {
      useGrouping: false,
    });
  }
  return utils.formatUnits(valueAsString.split(".")[0], exponent);
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
    maximumFractionDigits: 6,
    ...options,
  }).format(valueAsNumber);
}

export function convertAndFormat(value: BigNumber, exponent = 18) {
  return formatNumber(convertFromAtto(value, exponent));
}

export function amountToDolars(
  value: BigNumber,
  decimals: number,
  coingeckoPrice: number
) {
  return (
    Number(formatNumber(convertFromAtto(value, decimals))) * coingeckoPrice
  ).toFixed(2);
}

export function truncateNumber(number: string) {
  const index = number.indexOf(".");
  if (index !== undefined) {
    let end = index + 6;
    if (end > number.length) {
      end = number.length;
    }
    return parseFloat(number.substring(0, end));
  } else {
    return parseFloat(number);
  }
}
