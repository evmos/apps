import type {
  WalletClient,
  WalletClientContext as LeapWalletClientContext,
} from "@leapwallet/elements";
import {
  useWalletClient,
  useChain,
  useManager,
  useWallet,
} from "@cosmos-kit/react";
import { WalletClientContext } from "@cosmos-kit/core";
import React from "react";
import { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { StdSignDoc } from "@cosmjs/amino";
import { chains } from "chain-registry";

enum Network {
  MAINNET = "mainnet",
  TESTNET = "testnet",
}

export const useElementsWalletClient = (): WalletClient => {
  const context: WalletClientContext = useWalletClient();

  const client = context.client;

  const walletClient: WalletClient = React.useMemo(() => {
    return {
      enable: (chainIds: string | string[]) => {
        return client!.enable!(chainIds);
      },
      getAccount: async (chainId: string) => {
        await client!.enable!(chainId);
        const result = await client!.getAccount!(chainId);
        return {
          bech32Address: result.address,
          pubKey: result.pubkey,
          isNanoLedger: !!result.isNanoLedger,
        };
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      getSigner: async (chainId: string) => {
        const signer = client!.getOfflineSignerDirect!(chainId);
        const aminoSigner = client!.getOfflineSignerAmino!(chainId);

        return {
          signDirect: async (address: string, signDoc: SignDoc) => {
            const result = await signer.signDirect(address, signDoc);
            return {
              signature: new Uint8Array(
                Buffer.from(result.signature.signature, "base64"),
              ),
              signed: result.signed,
            };
          },
          signAmino: async (address: string, signDoc: StdSignDoc) => {
            const res = await aminoSigner.signAmino(address, signDoc);
            return {
              signature: new Uint8Array(
                Buffer.from(res.signature.signature, "base64"),
              ),
              signed: res.signed,
            };
          },
        };
      },
    };
  }, [client]);

  return walletClient;
};

export const useElementsWalletClientConfig = (): LeapWalletClientContext => {
  const walletClient = useElementsWalletClient();
  const { address } = useChain("osmosis");
  const { getWalletRepo } = useManager();
  const { mainWallet } = useWallet();

  const walletStatus = mainWallet?.walletStatus;

  return React.useMemo(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      userAddress: walletStatus === "Connected" ? address : undefined,
      walletClient,
      connectWallet: (chainId: unknown) => {
        let _chainId = chainId;
        if (typeof chainId !== "string") {
          _chainId = "osmosis-1";
        }
        const chain = chains.find((c) => c.chain_id === _chainId);
        if (!chain) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          throw new Error(`Chain ${chainId} not supported`);
        }
        return getWalletRepo(chain.chain_name).connect();
      },
      network: Network.MAINNET,
    } as const;
  }, [address, getWalletRepo, walletStatus, walletClient]);
};
