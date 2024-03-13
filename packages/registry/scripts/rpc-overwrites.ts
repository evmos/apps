// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

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
  osmosis: {
    tendermintRest: "https://proxy.evmos.org/osmosis",
  },
};
