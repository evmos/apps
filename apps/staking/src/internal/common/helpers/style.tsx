import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "ethers/lib/utils.js";
import { BIG_ZERO } from "../math/Bignumbers";

export function convertFromAtto(
  value: BigNumber | BigNumberish,
  exponent = 18
) {
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
  return formatUnits(valueAsString.split(".")[0], exponent);
}

export function convertAndFormat(
  value: BigNumber,
  exponent = 18,
  maxDigits = 2
) {
  return formatNumber(convertFromAtto(value, exponent), maxDigits);
}

export function formatNumber(
  value: string | number | undefined,
  maxDigits = 2,
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
    maximumFractionDigits: maxDigits,
    ...options,
  }).format(valueAsNumber);
}

export function formatPercentage(value: string | number) {
  let valueAsNumber = value;
  if (typeof valueAsNumber === "string") {
    valueAsNumber = Number(valueAsNumber);
  }

  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(valueAsNumber);
}

export function truncateNumber(number: string) {
  const index = number.indexOf(".");
  // if index is -1 return the string as float
  if (index !== -1) {
    let end = index + 6;
    if (end > number.length) {
      end = number.length;
    }
    return parseFloat(number.substring(0, end));
  } else {
    return parseFloat(number);
  }
}

export function getReservedForFeeText(
  amount: BigNumber,
  token: string,
  network: string
) {
  return `${convertAndFormat(
    amount,
    18,
    6
  )} ${token} is reserved for transaction fees on the ${network} network.`;
}

export function safeSubstraction(amount: BigNumber, fee: BigNumber) {
  const substraction = amount.sub(fee);
  if (substraction.lte(0)) {
    return BIG_ZERO;
  }
  return substraction;
}

export const numericOnly = (value: string) => {
  const reg = /^[0-9.]+$/;
  const preval = value;
  if (value === "" || reg.test(value)) {
    return value;
  } else {
    value = preval.substring(0, preval.length - 1);
    return value;
  }
};

export function convertStringFromAtto(value: BigNumberish, exponent = 18) {
  // value is a string with decimals.
  // it is the same as convertFromAtto but it receives a string and returns a number
  if (!value) return 0;
  let valueAsString = value.toString();
  if (typeof value === "number") {
    // Strip scientific notation
    valueAsString = Number(value).toLocaleString("fullwide", {
      useGrouping: false,
    });
  }
  return Number(formatUnits(valueAsString.split(".")[0], exponent));
}

export const getRemainingTime = (date: string) => {
  const target = new Date(date);
  const now = new Date();
  const difference = target.getTime() - now.getTime();

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <>
      {d}D {h}H {m}M ({target.getUTCMonth() + 1}/{target.getUTCDate()}/
      {target.getUTCFullYear()})
    </>
  );
};
