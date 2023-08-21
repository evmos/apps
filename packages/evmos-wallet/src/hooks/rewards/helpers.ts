// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "ethers";
import { convertFromAtto } from "helpers";
export const getBalance = (amount: BigNumber, wallet: boolean) => {
  if (!wallet) {
    return "-";
  }
  if (amount.isZero()) {
    return "0";
  }
  return Number(convertFromAtto(amount)).toFixed(2);
};

export const getBalanceInDollars = (
  amount: BigNumber,
  wallet: boolean,
  evmosPrice: string
) => {
  if (!wallet) {
    return "-";
  }

  if (amount.isZero()) {
    return "0";
  }

  if (isNaN(Number(evmosPrice))) {
    return "0";
  }
  return (Number(convertFromAtto(amount)) * Number(evmosPrice)).toFixed(2);
};

export const getNumberBalance = (amount: number, wallet: boolean) => {
  if (!wallet) {
    return "-";
  }
  if (amount === 0) {
    return "0";
  }
  return amount.toFixed(2);
};

export const getNumberBalanceInDollars = (
  amount: number,
  wallet: boolean,
  evmosPrice: string
) => {
  if (!wallet) {
    return "-";
  }
  if (amount === 0) {
    return "0";
  }
  if (isNaN(Number(evmosPrice))) {
    return "0";
  }
  return (amount * Number(evmosPrice)).toFixed(2);
};
