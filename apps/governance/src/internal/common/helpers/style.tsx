import { BigNumber, BigNumberish } from "ethers";
import { BIG_ZERO } from "../math/Bignumbers";
import { formatUnits } from "ethers/lib/utils.js";

export const feeVote = BigNumber.from("6250000000000000");

export const getPercentage = (value: string[]) => {
  // given an array of strings,
  // returns an array with the percents
  let total = 0;
  const sum = value.reduce((prev, curr) => {
    return prev + Number(curr);
  }, total);
  total = sum ? sum : 0;

  // avoid div by 0
  if (total === 0) {
    total = 1;
  }
  const percents = value.map((item) => {
    return (Number(item) * 100) / total;
  });
  return percents;
};

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date(date));
}

export const splitString = (value: string) => {
  if (value === undefined) {
    return "";
  }
  const splitted = value.split(".");
  if (splitted.length === 0) {
    return value;
  }
  return splitted[splitted.length - 1];
};

export function indexOfMax(arr: number[]) {
  // given an array of numbers, convert them to
  // numbers and returns index of greatest value
  if (arr === undefined || arr?.length === 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

export const sumBigNumber = (value: string[]) => {
  let total = BIG_ZERO;
  const sum = value?.reduce((prev, curr) => {
    return prev.add(BigNumber.from(curr));
  }, total);
  total = sum ? sum : BIG_ZERO;

  return total;
};

export const isVotingTimeWithinRange = (date: string) => {
  if (date === undefined) {
    return false;
  }
  const now = new Date();
  const nowUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
  const endPeriodVote = new Date(date);
  const endPeriodVoteUTC = Date.UTC(
    endPeriodVote.getUTCFullYear(),
    endPeriodVote.getUTCMonth(),
    endPeriodVote.getUTCDate(),
    endPeriodVote.getUTCHours(),
    endPeriodVote.getUTCMinutes(),
    endPeriodVote.getUTCSeconds()
  );
  const canVote =
    new Date(endPeriodVoteUTC).getTime() > new Date(nowUTC).getTime();
  return canVote;
};

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

export function formatAttoNumber(
  // it applies the Millon letter for example
  value: BigNumberish | BigNumber,
  options?: Intl.NumberFormatOptions,
  notation: "standard" | "compact" = "compact",
  maxDigits = 2
) {
  const converted = convertFromAtto(value);
  return formatNumber(converted, maxDigits, options, notation);
}

export function convertAndFormat(
  value: BigNumber,
  exponent = 18,
  maxDigits = 2
) {
  return formatNumber(convertFromAtto(value, exponent), maxDigits);
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
