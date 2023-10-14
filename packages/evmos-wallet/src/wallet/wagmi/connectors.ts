import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { SafeConnector } from "wagmi/connectors/safe";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { KeplrConnector } from "./keplrConnector";
import { getEvmosChainInfo } from "./chains";

const evmos = getEvmosChainInfo();
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
export const safeConnector = new SafeConnector({
  chains: [evmos],
  options: { debug: false },
});
void walletConnectConnector.getProvider().then((provider) => {
  // @ts-expect-error: for some reason WalletConnectConnector
  // doesn't allow us to pass
  // the required methods, which breaks metamask
  provider?.rpc?.methods?.push(
    "eth_signTypedData_v4",
    "wallet_addEthereumChain",
    "wallet_switchEthereumChain"
  );
});

export const CONNECTOR_MAP = {
  [keplrConnector.id]: keplrConnector,
  [metamaskConnector.id]: metamaskConnector,
  [walletConnectConnector.id]: walletConnectConnector,
  [safeConnector.id]: safeConnector,
} as const;
