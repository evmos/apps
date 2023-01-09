import {
  EVMOS_CHAIN_NAME,
  EVMOS_DECIMALS,
  EVMOS_ETH_CHAIN_ID,
  EVMOS_COSMOS_EXPLORER,
  EVMOS_RPC_URL,
  EVMOS_SYMBOL,
  EVMOS_GRPC_URL,
} from "../networkConfig";

import type { Maybe } from "@metamask/providers/dist/utils";
import { signatureToPubkey } from "@hanchon/signature-to-pubkey";
import { evmosToEth } from "@evmos/address-converter";
import { queryPubKey } from "../pubkey";
import { METAMASK_NOTIFICATIONS } from "../errors";

export async function switchEthereumChain(ethChainId: string) {
  if (!window.ethereum) return false;
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ethChainId }],
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function changeNetworkToEvmosMainnet(): Promise<boolean> {
  if (!window.ethereum) return false;
  const switched = await switchEthereumChain(EVMOS_ETH_CHAIN_ID);
  if (switched === true) {
    return true;
  }
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: EVMOS_ETH_CHAIN_ID,
          chainName: EVMOS_CHAIN_NAME,
          nativeCurrency: {
            name: EVMOS_CHAIN_NAME,
            symbol: EVMOS_SYMBOL,
            decimals: EVMOS_DECIMALS,
          },
          rpcUrls: [EVMOS_RPC_URL],
          // TODO: this should be a ethereum explorer, but we don't have a good one yet
          blockExplorerUrls: [EVMOS_COSMOS_EXPLORER],
        },
      ],
    });
    return true;
  } catch (e) {
    return false;
  }
}

export function subscribeToAccountChange(
  handler: (a: Maybe<string[]>) => void
): boolean {
  if (!window.ethereum) return false;
  try {
    window.ethereum.removeAllListeners("accountsChanged");
    // It expect unknown instead of string
    // @ts-expect-error type error
    window.ethereum.on("accountsChanged", handler);
    return true;
  } catch (e) {
    return false;
  }
}

export function unsubscribeToEvents() {
  if (!window.ethereum) return;
  try {
    window.ethereum.removeAllListeners("accountsChanged");
    window.ethereum.removeAllListeners("chainChanged");
    return;
  } catch (e) {
    return;
  }
}

export function subscribeToChainChanged(): boolean {
  if (!window.ethereum) return false;
  try {
    window.ethereum.removeAllListeners("chainChanged");
    window.ethereum.on("chainChanged", async () => {
      await switchEthereumChain(EVMOS_ETH_CHAIN_ID);
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function getWallet() {
  if (!window.ethereum) return null;
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [],
    });
    if (accounts) {
      // NOTE: it always return string[] but the type is defined as unknown
      if ((accounts as string[]).length > 0) {
        return (accounts as string[])[0];
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function generatePubkeyFromSignature(wallet: string) {
  if (!window.ethereum) return null;
  try {
    if (wallet.startsWith("evmos1")) {
      wallet = evmosToEth(wallet);
    }
    // Make the user sign the generate_pubkey message
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [wallet, "generate_pubkey"],
    });

    if (signature) {
      // Recover the signature
      const message = Buffer.from([
        50, 215, 18, 245, 169, 63, 252, 16, 225, 169, 71, 95, 254, 165, 146,
        216, 40, 162, 115, 78, 147, 125, 80, 182, 25, 69, 136, 250, 65, 200, 94,
        178,
      ]);

      return signatureToPubkey(signature as string, message);
    }
  } catch (e) {
    return null;
  }
  return null;
}

export async function generatePubKey(
  account: string,
  evmosGRPCUrl = EVMOS_GRPC_URL
) {
  let pubkey = await queryPubKey(evmosGRPCUrl, account);
  if (pubkey === null) {
    pubkey = await generatePubkeyFromSignature(account);
  }
  return pubkey;
}

export type Token = {
  erc20Address: string;
  symbol: string;
  decimals: number;
};

export async function addToken(token: Token) {
  if (window.ethereum) {
    try {
      if (token) {
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: token.erc20Address, // The address that the token is at.
              symbol: token.symbol === "EVMOS" ? "WEVMOS" : token.symbol,
              decimals: token.decimals, // The number of decimals in the token
              // image: token.img, // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          return {
            text: METAMASK_NOTIFICATIONS.AddTokenTitle,
            type: "success",
          };
          // Sentry.captureMessage(`User adds token ${token} to wallet.`);
        } else {
          return {
            text: METAMASK_NOTIFICATIONS.ErrorAddToken,
            type: "error",
          };
          // Sentry.captureMessage(`Did not add token ${token} to wallet.`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
