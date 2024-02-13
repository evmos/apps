// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { formatUnits, parseEther } from "@ethersproject/units";
import { safeBigInt } from "./bigint/safe-bigint";
import { divide } from "./bigint";

export function convertFromAtto(
  value: BigNumber | BigNumberish,
  exponent = 18,
) {
  // Convert to string and truncate past decimal
  // for appropriate conversion
  if (!value) return "0";
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  let valueAsString = value.toString();
  if (typeof value === "number") {
    // Strip scientific notation
    valueAsString = Number(value).toLocaleString("fullwide", {
      useGrouping: false,
    });
  }
  return formatUnits(valueAsString.split(".")?.[0] ?? "0", exponent);
}

export function convertToAtto(value: BigNumberish) {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return parseEther(value.toString());
}

export function convertAndFormat(
  value: BigNumber,
  exponent = 18,
  maxDigits = 2,
) {
  return formatNumber(convertFromAtto(value, exponent), maxDigits);
}

export function formatNumber(
  value: string | number | undefined,
  maxDigits = 2,
  options?: Intl.NumberFormatOptions,
  notation: "standard" | "compact" = "standard",
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
  network: string,
) {
  return `${convertAndFormat(
    amount,
    18,
    6,
  )} ${token} is reserved for transaction fees on the ${network} network.`;
}

export function safeSubstraction(amount: BigNumber, fee: BigNumber) {
  const substraction = amount.sub(fee);
  if (substraction.lte(0)) {
    return BigNumber.from("0");
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
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  let valueAsString = value.toString();
  if (typeof value === "number") {
    // Strip scientific notation
    valueAsString = Number(value).toLocaleString("fullwide", {
      useGrouping: false,
    });
  }
  return Number(formatUnits(valueAsString.split(".")?.[0] ?? "0", exponent));
}

export function amountToDollars(
  value: BigNumber,
  decimals: number,
  coingeckoPrice: number,
) {
  if (!value || !coingeckoPrice) {
    return "0";
  }
  return (Number(convertFromAtto(value, decimals)) * coingeckoPrice).toFixed(2);
}

export function formatDate(date: string | number | Date) {
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
    now.getUTCSeconds(),
  );
  const endPeriodVote = new Date(date);
  const endPeriodVoteUTC = Date.UTC(
    endPeriodVote.getUTCFullYear(),
    endPeriodVote.getUTCMonth(),
    endPeriodVote.getUTCDate(),
    endPeriodVote.getUTCHours(),
    endPeriodVote.getUTCMinutes(),
    endPeriodVote.getUTCSeconds(),
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
  return splitted[splitted.length - 1] ?? value;
};

export const sumBigNumber = (value: string[]) => {
  let total = BigNumber.from("0");
  const sum = value?.reduce((prev, curr) => {
    return prev.add(BigNumber.from(curr));
  }, total);
  total = sum ? sum : BigNumber.from("0");

  return total;
};

export const getPercentage = (counts: {
  yes: string;
  no: string;
  abstain: string;
  noWithVeto: string;
}) => {
  const total = Object.values(counts).reduce((prev, curr) => {
    return prev + safeBigInt(curr);
  }, 0n);
  if (total === 0n) {
    return {
      yes: 0,
      no: 0,
      abstain: 0,
      noWithVeto: 0,
    };
  }
  return {
    yes: divide(safeBigInt(counts.yes), total),
    no: divide(safeBigInt(counts.no), total),
    abstain: divide(safeBigInt(counts.abstain), total),
    noWithVeto: divide(safeBigInt(counts.noWithVeto), total),
  };
};

export function formatAttoNumber(
  // it applies the Millon letter for example
  value: BigNumberish | BigNumber,
  options?: Intl.NumberFormatOptions,
  notation: "standard" | "compact" = "compact",
  maxDigits = 2,
) {
  const converted = convertFromAtto(value);
  return formatNumber(converted, maxDigits, options, notation);
}

export function createBigNumber(value: string) {
  // +: check the string by converting the string into a number
  if (!+value) {
    return BigNumber.from("0");
  }
  return BigNumber.from(value);
}

type Staked = {
  total: string | undefined;
  decimals: number | undefined;
  coingeckoPrice: number | undefined;
};

type TableDataElement = {
  name: string;
  decimals: number;
  description: string;
  erc20Balance: BigNumber;
  symbol: string;
  tokenName: string;
  chainId: string;
  chainIdentifier: string;
  handledByExternalUI: null | { handlingAction: string; url: string };
  coingeckoPrice: number;
  prefix: string;
  pngSrc: string;
  erc20Address: string;
  tokenIdentifier: string;
};

type TableData = {
  table: TableDataElement[];
  feeBalance: BigNumber;
};

export function getTotalAssets(
  normalizedAssetsData: TableData,
  staked: Staked,
) {
  let totalAssets = 0;
  normalizedAssetsData?.table?.map((item) => {
    totalAssets =
      totalAssets +
      parseFloat(
        amountToDollars(item.erc20Balance, item.decimals, item.coingeckoPrice),
      );
  });
  if (
    staked.total !== undefined &&
    staked.total !== "0" &&
    staked.decimals !== undefined &&
    staked.coingeckoPrice !== undefined
  ) {
    const val = parseFloat(
      amountToDollars(
        BigNumber.from(staked.total),
        staked.decimals,
        staked.coingeckoPrice,
      ),
    );
    totalAssets = totalAssets + val;
  }

  return totalAssets.toFixed(2);
}

export function checkFormatAddress(address: string, prefix: string) {
  if (address.startsWith(prefix.toLocaleLowerCase() + "1")) {
    return true;
  }
  return false;
}

export function indexOfMax(arr: number[]): number {
  if (!arr?.length) return -1;

  let maxIndex = 0;
  let maxValue = arr[0] ?? 0;

  arr.forEach((value, index) => {
    if (value !== undefined && value > maxValue) {
      maxValue = value;
      maxIndex = index;
    }
  });

  return maxIndex;
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

export const displayTopBarTooltip = (value: BigNumber) => {
  if (value.lte(BigNumber.from("0"))) {
    return false;
  }
  if (convertFromAtto(value).split(".")[1]?.length === 2) {
    return false;
  }
  return true;
};

// get formattedDate for receipt modal
// Example: Jan 1, 2021 12:00AM
export const getFormattedDate = (date: Date) => {
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

  const formattedDate = `${month} ${day},${year} ${displayHours}:${
    minutes < 10 ? "0" + minutes : minutes
  }${amOrPm}`;
  return formattedDate;
};
