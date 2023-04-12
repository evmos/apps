import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "ethers/lib/utils.js";
import { BIG_ZERO } from "../math/Bignumbers";
import { addAssetsType, addDolarsAssetsType } from "../../types";

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

export function amountToDollars(
  value: BigNumber,
  decimals: number,
  coingeckoPrice: number
) {
  if (!value || !coingeckoPrice) {
    return "0";
  }
  return (Number(convertFromAtto(value, decimals)) * coingeckoPrice).toFixed(2);
}

export function addAssets(asset: addAssetsType) {
  return (
    Number(convertFromAtto(asset.cosmosBalance, asset.decimals)) +
    Number(convertFromAtto(asset.erc20Balance, asset.decimals))
  );
}

export function addDolarAssets(assets: addDolarsAssetsType) {
  return (
    parseFloat(
      amountToDollars(
        assets.cosmosBalance,
        assets.decimals,
        assets.coingeckoPrice
      )
    ) +
    parseFloat(
      amountToDollars(
        assets.erc20Balance,
        assets.decimals,
        assets.coingeckoPrice
      )
    )
  );
}

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

export const sumBigNumber = (value: string[]) => {
  let total = BIG_ZERO;
  const sum = value?.reduce((prev, curr) => {
    return prev.add(BigNumber.from(curr));
  }, total);
  total = sum ? sum : BIG_ZERO;

  return total;
};

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
