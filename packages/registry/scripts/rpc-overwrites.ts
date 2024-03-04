// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const lavaUserId = "ef1ad852a77275e1eeef6c7972370118";

export const overwrites: Record<
  string,
  {
    cosmosRest?: string;
    tendermintRest?: string;
    evmRest?: string;
  }
> = {
  evmos: {
    cosmosRest: "https://proxy.evmos.org/cosmos",
    evmRest: "https://proxy.evmos.org/web3",
  },
};
