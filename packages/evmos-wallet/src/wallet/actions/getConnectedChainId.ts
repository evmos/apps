// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getWalletClient } from "wagmi/actions";
import { wagmiConfig } from "..";

export const getConnectedChainId = () => {
  return getWalletClient(wagmiConfig).then((client) => client.getChainId());
};
