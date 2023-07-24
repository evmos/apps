// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { configureChains, createConfig, mainnet } from "wagmi";
import { evmos } from "wagmi/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

export const projectId = "ae920fe62c5a565cfaaa6edacbbb6fa7";
const chains = [evmos, mainnet];

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

//@ts-ignore
export const ethereumClient = new EthereumClient(wagmiConfig, chains);
