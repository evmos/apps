// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { formatUnits } from "viem";

export const tokenToUSD = (amount: bigint, price: number, decimals: number) => {
  const unformmatedUsd = Number(
    formatUnits((amount * BigInt(~~(1000 * Number(price)))) / 1000n, decimals),
  );
  return unformmatedUsd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
