// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { raise } from "helpers/src/error-handling";
import { getChainId } from "wagmi/actions";
import { wagmiConfig } from "..";

export const getEvmosConfig = () => {
  return (
    wagmiConfig.chains.find((chain) => chain.id === getChainId(wagmiConfig)) ??
    wagmiConfig.chains.find((chain) => chain.ref === "evmos") ??
    raise("Evmos chain not found")
  );
};

export const getEvmosChainRef = () => getEvmosConfig().ref;
