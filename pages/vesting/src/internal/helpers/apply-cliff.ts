// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Period, Coin } from "@evmos/transactions";
import { sumCoins } from "./sum-coins";

export const applyCliff = (cliff: number, periods: Period[]): Period[] => {
  if (periods.length === 0) return periods;
  const newEvents = [];
  let coins: Coin[] = [];

  let totalLength = 0;
  periods.forEach((period) => {
    totalLength += period.length;
    if (totalLength <= cliff) {
      coins = sumCoins([coins, period.amount]);
      return;
    }
    if (coins.length) {
      newEvents.push({
        length: cliff,
        amount: coins,
      });
      coins = [];
    }
    newEvents.push(period);
  });

  if (coins.length) {
    // special case if all events are before the cliff
    newEvents.push({
      length: cliff,
      amount: coins,
    });
  }
  return newEvents;
};
