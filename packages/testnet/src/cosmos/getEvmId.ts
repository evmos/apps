// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const getEvmId = (chainId: string) => {
  const id = parseInt(chainId.match(/_(\d+)/)?.[1] || "");
  if (isNaN(id)) {
    throw new Error(`Invalid chain ID: ${chainId}`);
  }
  return id;
};
