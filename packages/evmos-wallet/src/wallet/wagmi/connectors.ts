import { evmos } from "viem/chains";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { KeplrConnector } from "./keplrConnector";
import "@wagmi/connectors";

export const walletConnectConnector = new WalletConnectConnector({
  chains: [evmos],
  options: {
    showQrModal: true,
    projectId: WALLET_CONNECT_PROJECT_ID,
  },
});

export const metamaskConnector = new MetaMaskConnector({
  chains: [evmos],
});

export const keplrConnector = new KeplrConnector({
  chains: [evmos],
});
walletConnectConnector
  .getProvider()
  .then((provider) => {
    // @ts-expect-error: for some reason WalletConnectConnector
    // doesn't allow us to pass
    // the required methods, which breaks metamask
    provider?.rpc?.methods?.push(
      "eth_signTypedData_v4",
      "wallet_addEthereumChain",
      "wallet_switchEthereumChain"
    );
  })
  .catch(console.error);

export const CONNECTOR_MAP = {
  [keplrConnector.id]: keplrConnector,
  [metamaskConnector.id]: metamaskConnector,
  [walletConnectConnector.id]: walletConnectConnector,
} as const;
