import { evmosToEth } from "@evmos/address-converter";
import { signatureToPubkey } from "@hanchon/signature-to-pubkey";
import { Signer } from "ethers";
import { Token } from "../metamask/metamaskHelpers";
import { wagmiClient } from "./walletconnect";

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
