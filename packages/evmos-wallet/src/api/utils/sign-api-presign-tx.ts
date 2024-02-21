// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { createTxRaw } from "@evmos/proto";
import { getAccount, getChainId } from "wagmi/actions";
import { assert } from "helpers";
import { signTypedDataMessage, wagmiConfig } from "../../wallet";
import { apiBroadcastEip712, apiBroadcastRawTx } from "../evmos-api/broadcast";
import { ApiPresignTx } from "../../utils";
import { getEvmosChainInfo } from "../../wallet/wagmi/chains";
import { ethToEvmos } from "helpers/src/crypto/addresses/eth-to-evmos";
import {
  COSMOS_BASED_WALLETS,
  isCosmosBasedWallet,
} from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { signers, providers } from "./cosmos-based";

const evmosInfo = getEvmosChainInfo();

async function signBackendTypedDataTransaction({
  typedData,
  legacyAmino,
}: ApiPresignTx) {
  const { address, connector } = getAccount(wagmiConfig);
  const chainId = getChainId(wagmiConfig);
  assert(
    chainId && address && connector && typedData,
    "COULD_NOT_SIGN_TRANSACTION",
  );

  const signature = await signTypedDataMessage(typedData);

  return {
    signature,
    broadcast: () =>
      apiBroadcastEip712({
        chainId,
        feePayer: ethToEvmos(address),
        feePayerSig: signature,
        body: legacyAmino.body,
        authInfo: legacyAmino.authInfo,
      }),
  } as const;
}

async function signBackendDirectTransaction(transaction: ApiPresignTx) {
  const { address, connector } = getAccount(wagmiConfig);

  assert(address && connector, "COULD_NOT_SIGN_TRANSACTION");

  assert(
    isCosmosBasedWallet(connector.name as COSMOS_BASED_WALLETS),
    "UNSUPPORTED_SIGN_METHOD",
  );

  const response = await signers[connector.name as COSMOS_BASED_WALLETS]({
    chainId: transaction.chainId,
    sender: ethToEvmos(address),
    body: transaction.directSignDoc,
  });

  return {
    signature: response.signature.signature,
    broadcast: () =>
      apiBroadcastRawTx({
        rawTx: createTxRaw(
          response.signed.bodyBytes,
          response.signed.authInfoBytes,
          [new Uint8Array(Buffer.from(response.signature.signature, "base64"))],
        ),
      }),
  } as const;
}

export async function signApiPresignTx(presignedTx: ApiPresignTx) {
  const { address, connector } = getAccount(wagmiConfig);

  assert(address && connector, "COULD_NOT_SIGN_TRANSACTION");
  /**
   * If the connector is keplr / leap, we need to check if the key is a ledger key.
   * If it is, we need to sign the transaction as typed data
   */
  const connectorCosmosBased =
    await providers[connector.name as COSMOS_BASED_WALLETS]();

  if (connectorCosmosBased) {
    connectorCosmosBased.defaultOptions = {
      sign: {
        preferNoSetFee: presignedTx.chainId === evmosInfo.cosmosId,
      },
    };
    const key = await connectorCosmosBased.getKey(presignedTx.chainId);
    if (!key.isNanoLedger) return signBackendDirectTransaction(presignedTx);
  }

  return signBackendTypedDataTransaction(presignedTx);
}
