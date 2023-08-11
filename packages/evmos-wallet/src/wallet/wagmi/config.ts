import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "@wagmi/core/providers/public";
import {
  keplrConnector,
  metamaskConnector,
  walletConnectConnector,
} from "./connectors";
import { getEvmosChainInfo } from "./chains";

const { publicClient } = configureChains(
  [getEvmosChainInfo()],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [metamaskConnector, walletConnectConnector, keplrConnector],
  publicClient,
});
