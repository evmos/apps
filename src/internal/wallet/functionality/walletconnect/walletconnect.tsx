import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { useEffect } from "react";
import {
  useAccount,
  configureChains,
  createClient,
  ProviderRpcError,
} from "wagmi";
import { evmos } from "wagmi/chains";
import { useWeb3Modal } from "@web3modal/react";

import {
  NotifyError,
  NotifySuccess,
} from "../../../common/notifications/notifications";
import {
  ReduxWalletStore,
  resetWallet,
  setWallet,
} from "../../../../components/wallet/redux/WalletSlice";
import { truncateAddress } from "../../style/format";
import { WALLECT_CONNECT_KEY } from "../wallet";
import { SaveProviderToLocalStorate } from "../localstorage";
import { ethToEvmos, evmosToEth } from "@evmos/address-converter";
import { queryPubKey } from "../pubkey";
import { EVMOS_CHAIN, EVMOS_GRPC_URL } from "../networkConfig";
import { providers, Signer, TypedDataField } from "ethers";
import { signatureToPubkey } from "@hanchon/signature-to-pubkey";
import { Token } from "../metamask/metamaskHelpers";
import { EIPToSign, Sender, TxGenerated } from "@evmos/transactions";
import type { Logger } from "ethers/lib/utils.js";
import { createEIP712Transaction, TxGeneratedByBackend } from "../signing";
// Ethers does not have an error type so we can use this for casting
// https://github.com/ethers-io/ethers.js/blob/main/packages/logger/src.ts/index.ts#L268
export type EthersError = Error & {
  reason: string;
  code: keyof typeof Logger.errors;
};

// Config
export const projectId = "ae920fe62c5a565cfaaa6edacbbb6fa7";

const chains = [evmos];
//
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

export function useWalletConnect(reduxStore: ReduxWalletStore) {
  const { open } = useWeb3Modal();
  const { address, isConnecting } = useAccount();

  async function connect() {
    if (!address && !isConnecting) {
      await open({ route: "ConnectWallet" });
    }
    SaveProviderToLocalStorate(WALLECT_CONNECT_KEY);
    reduxStore.dispatch(
      setWallet({
        active: false,
        extensionName: WALLECT_CONNECT_KEY,
        evmosAddressEthFormat: "",
        evmosAddressCosmosFormat: "",
        evmosPubkey: null,
        osmosisPubkey: null,
      })
    );
  }

  return { connect, address };
}

export async function signEvmosjsTxWithWalletConnect(
  sender: Sender,
  tx: TxGenerated
) {
  try {
    const signer = (await wagmiClient.connector?.getSigner?.({
      chainId: 9001,
    })) as providers.JsonRpcSigner;

    if (
      signer === undefined ||
      evmosToEth(sender.accountAddress) != (await signer.getAddress())
    ) {
      return {
        result: false,
        message: `Error signing the tx: Wallect Connect signer could not be connected`,
        transaction: null,
      };
    }

    const types_ = Object.entries(tx.eipToSign.types)
      .filter(([key]) => key !== "EIP712Domain")
      .reduce((types, [key, attributes]: [string, TypedDataField[]]) => {
        types[key] = attributes.filter((attr) => attr.type !== "EIP712Domain");
        return types;
      }, {} as Record<string, TypedDataField[]>);

    let signature = "";
    try {
      signature = await signer._signTypedData(
        tx.eipToSign.domain,
        types_,
        tx.eipToSign.message
      );
    } catch (error) {
      if (
        (error as ProviderRpcError).code === 4001 ||
        (error as EthersError).code === "ACTION_REJECTED"
      ) {
        return {
          result: false,
          message: `Error signing the tx: Transaction was not signed.`,
          transaction: null,
        };
      }
      return {
        result: false,
        // Disabled until catching all the possible errors
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        message: `Error signing the tx: ${error}`,
        transaction: null,
      };
    }

    const transaction = createEIP712Transaction(
      EVMOS_CHAIN,
      sender,
      signature,
      tx
    );
    return {
      result: true,
      message: "",
      transaction: transaction,
    };
  } catch (e) {
    // TODO: send custom responses for each of the knonw cases
    return {
      result: false,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Error signing the tx: ${e}`,
      transaction: null,
    };
  }
}

export async function signBackendTxWithWalletConnect(
  sender: string,
  tx: TxGeneratedByBackend
) {
  const eipToSignUTF8 = JSON.parse(
    Buffer.from(tx.eipToSign, "base64").toString("utf-8")
  ) as EIPToSign;

  const signer = (await wagmiClient.connector?.getSigner?.({
    chainId: 9001,
  })) as providers.JsonRpcSigner;

  if (signer === undefined || sender != (await signer.getAddress())) {
    return {
      result: false,
      message: `Error signing the tx: Wallect Connect signer could not be connected`,
      transaction: null,
    };
  }

  const types_ = Object.entries(eipToSignUTF8.types)
    .filter(([key]) => key !== "EIP712Domain")
    .reduce((types, [key, attributes]: [string, TypedDataField[]]) => {
      types[key] = attributes.filter((attr) => attr.type !== "EIP712Domain");
      return types;
    }, {} as Record<string, TypedDataField[]>);

  let signature = "";
  try {
    // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
    signature = await signer._signTypedData(
      eipToSignUTF8.domain,
      types_,
      eipToSignUTF8.message
    );

    return {
      result: true,
      message: "",
      signature: signature,
    };
  } catch (error) {
    if (
      (error as ProviderRpcError).code === 4001 ||
      (error as EthersError).code === "ACTION_REJECTED"
    ) {
      return {
        result: false,
        message: `Error signing the tx: Transaction was not signed.`,
        transaction: null,
      };
    }
    return {
      result: false,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Error signing the tx: ${error}`,
      transaction: null,
    };
  }
}

export async function watchAssetWalletConnect(token: Token) {
  try {
    const connector = wagmiClient.connector;
    if (connector === undefined) {
      return null;
    }
    if (connector.watchAsset === undefined) {
      return null;
    }
    const added = await connector.watchAsset({
      address: token.erc20Address,
      symbol: token.symbol === "EVMOS" ? "WEVMOS" : token.symbol,
      decimals: token.decimals,
      image: token.img,
    });
    return added;
  } catch (e) {
    return false;
  }
}

export async function getWalletWalletConnect() {
  try {
    const signer = (await wagmiClient.connector?.getSigner?.({
      chainId: 9001,
    })) as Signer;

    if (signer === undefined) {
      return null;
    }

    return await signer.getAddress();
  } catch (e) {
    return null;
  }
}

export async function generatePubkeyFromSignatureWalletConnect(wallet: string) {
  try {
    if (wallet.startsWith("evmos1")) {
      wallet = evmosToEth(wallet);
    }

    const signer = (await wagmiClient.connector?.getSigner?.({
      chainId: 9001,
    })) as Signer;

    if (signer === undefined) {
      return null;
    }

    // Make the user sign the generate_pubkey message
    const signature = await signer.signMessage("generate_pubkey");

    if (signature) {
      // Recover the signature
      const message = Buffer.from([
        50, 215, 18, 245, 169, 63, 252, 16, 225, 169, 71, 95, 254, 165, 146,
        216, 40, 162, 115, 78, 147, 125, 80, 182, 25, 69, 136, 250, 65, 200, 94,
        178,
      ]);

      return signatureToPubkey(signature, message);
    }
  } catch (e) {
    return null;
  }
  return null;
}

export function useActivateWalletConnect(
  store: ReduxWalletStore,
  notificationsEnabled: boolean,
  extensionName: string
) {
  const { address, isDisconnected } = useAccount();

  async function generatePubKeyWalletConnect(
    account: string,
    evmosGRPCUrl = EVMOS_GRPC_URL
  ) {
    let pubkey = await queryPubKey(evmosGRPCUrl, account);
    if (pubkey === null) {
      pubkey = await generatePubkeyFromSignatureWalletConnect(account);
    }
    return pubkey;
  }

  useEffect(() => {
    async function execute() {
      if (extensionName !== WALLECT_CONNECT_KEY) {
        return;
      }

      if (isDisconnected) {
        store.dispatch(resetWallet());
        return;
      }

      if (address) {
        const pubkey = await generatePubKeyWalletConnect(address);

        if (pubkey === null) {
          store.dispatch(resetWallet());
          NotifyError(
            "WalletConnect Error",
            "You must sign the generate pubkey message to use the dashboard.",
            store,
            notificationsEnabled
          );
          return;
        }

        store.dispatch(
          setWallet({
            active: true,
            extensionName: WALLECT_CONNECT_KEY,
            evmosAddressEthFormat: address,
            evmosAddressCosmosFormat: ethToEvmos(address),
            evmosPubkey: pubkey,
            osmosisPubkey: null,
          })
        );

        NotifySuccess(
          "Connected with WalletConnect",
          "Using wallet " + truncateAddress(address),
          store,
          notificationsEnabled
        );
      }
    }

    // Execute the async function
    // Can not await inside a useEffect
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    execute();
  }, [address, isDisconnected, extensionName, notificationsEnabled, store]);
}
