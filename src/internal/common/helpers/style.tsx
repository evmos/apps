import { BigNumber } from "ethers";
import { BIG_ZERO } from "../math/Bignumbers";

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
  const endPeriodVote = new Date(date);
  // change to <
  const canVote = endPeriodVote < now;
  return canVote;
};
