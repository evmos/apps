// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { switchChain } from "wagmi/actions";
import { wagmiConfig } from "..";
import { getConnectedChainId } from "./getConnectedChainId";
import { getEvmosChainInfo } from "../wagmi/chains";

const evmos = getEvmosChainInfo();
export const switchToEvmosChain = async () => {
  const connectedChainId = await getConnectedChainId();
  if (connectedChainId !== evmos.id) {
    return switchChain(wagmiConfig, {
      chainId: evmos.id,
    });
  }
};
