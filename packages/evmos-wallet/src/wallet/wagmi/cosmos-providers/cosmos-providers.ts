// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  evmoslocalnet,
  evmosmainnet,
  evmostestnet,
} from "helpers/src/evmos-info";
import { CosmosEIP1193Provider } from "./cosmos-eip1193-provider";
import { getKeplrProvider } from "../../utils/keplr/getKeplrProvider";
import { getLeapProvider } from "../../utils/leap/getLeapProvider";

const cosmosChainConfig = {
  DEFAULT: evmosmainnet.id,
  [evmosmainnet.id]: {
    isNative: true,
    chainId: evmosmainnet.cosmosChainId,
  },
  [evmostestnet.id]: () =>
    import("@evmosapps/registry/src/keplr/evmostestnet.json").then(
      (module) => module.default,
    ),
  [evmoslocalnet.id]: () =>
    import("@evmosapps/registry/src/keplr/evmostestnet.json").then(
      (module) => module.default,
    ),
} as const;
export const keplrProvider = new CosmosEIP1193Provider(
  "keplr",
  cosmosChainConfig,
  getKeplrProvider,
);

export const leapProvider = new CosmosEIP1193Provider(
  "leap",
  cosmosChainConfig,
  getLeapProvider,
);
