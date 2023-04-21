// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { evmos } from "wagmi/chains";
// TODO: move this to a ENV VAR
export const projectId = "ae920fe62c5a565cfaaa6edacbbb6fa7";

const chains = [evmos];
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);
