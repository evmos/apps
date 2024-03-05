// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { type WalletClient } from "@leapwallet/elements";
import { useWalletClient } from "@cosmos-kit/react";
import { WalletClientContext } from "@cosmos-kit/core";
import React from "react";
import { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { StdSignDoc } from "@cosmjs/amino";

enum NETWORK {
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
      // NOTE: walletconect requiere get signer async
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
          network: NETWORK.MAINNET, // to enable testnet in elements
        };
      },
    };
  }, [client]);

  return walletClient;
};
