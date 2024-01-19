// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";

export const distributeCoinsEvenly = (total: BigNumber, parts: number) => {
  if (parts < 1) {
    throw new Error("Divisor must be greater than 1");
  }
  if (total.lt(0)) {
    throw new Error("Total must be greater than 0");
  }
  const divisions: BigNumber[] = [];
  const truncated = total.div(parts);
  const remainder = total.mod(parts);
  let fraction = BigNumber.from(0);

  for (let i = 0; i < parts; i++) {
    const nextFraction = remainder.mul(i + 1).div(parts);
    divisions[i] = truncated.add(nextFraction.sub(fraction));
    fraction = nextFraction;
  }
  return divisions;
};
