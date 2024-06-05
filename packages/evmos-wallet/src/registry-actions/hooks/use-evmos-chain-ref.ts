// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EVMOS_CONFIG_MAP } from "helpers/src/evmos-info";
import { useChainId } from "wagmi";

const EVMOS_CONFIG_BY_EVM_ID = new Map(
  Object.values(EVMOS_CONFIG_MAP).map((config) => [config.id, config]),
);

export const useEvmosChainRef = () => {
  const chainId = useChainId();
  return EVMOS_CONFIG_BY_EVM_ID.get(chainId)?.ref ?? EVMOS_CONFIG_MAP.evmos;
};
