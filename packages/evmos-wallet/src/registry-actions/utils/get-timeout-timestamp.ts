// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;
export const getTimeoutTimestamp = () =>
  BigInt(Date.now() + ONE_DAY_IN_MILLISECONDS) * 1000000n;
