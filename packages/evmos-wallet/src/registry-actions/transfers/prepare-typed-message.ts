// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Message } from "@bufbuild/protobuf";

import { getChainAccountInfo } from "../utils/get-chain-account-info";
import { getEvmosChainInfo } from "../../wallet/wagmi/chains";
import { Hex, fromHex, toHex } from "viem";
import { encodeEvmosEIP712Types } from "helpers/src/crypto/eip712/encode-evmos-types";
import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";
import { multiply } from "helpers";

import { PubKey } from "@buf/evmos_evmos.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb";

import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";
import { apiCosmosTxBroadcast } from "../../api/cosmos-rest/api-cosmos-tx-broadcast";
import { recoverPubkeyFromTypedMessage } from "helpers/src/crypto/eip712/recover-pubkey-from-typed-message";
import { Address } from "helpers/src/crypto/addresses/types";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { wagmiConfig } from "../..";
import { getChainId } from "wagmi/actions";
import { getAminoName } from "./getAminoName";

const evmos = getEvmosChainInfo();

export const createTypedMessage = async ({
  sender,
  messages,
  gasLimit = 10500000n,
}: {
  sender: Address;
  messages: Message[];
  gasLimit?: bigint;
}) => {
  const account = await getChainAccountInfo(sender);

  const serializedMsgs = await Promise.all(
    messages.map(async (msg) => {
      const type = await getAminoName(msg.getType().typeName);
      return {
        type,
        value: msg.toJson({
          useProtoFieldName: true,
        }) as Record<string, unknown>,
      };
    }),
  );

  return {
    messages,
    tx: {
      types: encodeEvmosEIP712Types(serializedMsgs),
      primaryType: "Tx",

      domain: {
        name: "Cosmos Web3",
        version: "1.0.0",
        chainId: toHex(getChainId(wagmiConfig)),
        verifyingContract: "cosmos",
        salt: "0",
      },
      message: {
        account_number: account.accountNumber,
        chain_id: evmos.cosmosId,
        fee: {
          amount: [
            {
              amount: multiply(
                gasLimit,
                evmos.registry.gasPriceStep.average,
              ).toString(),
              denom: evmos.registry.feeToken,
            },
          ],
          gas: gasLimit.toString(),
        },
        memo: "",
        ...Object.fromEntries(serializedMsgs.map((msg, i) => [`msg${i}`, msg])),
        sequence: account.sequence.toString(),
      },
    } as const,
    account,
  } as const;
};

type PreparedTypedTx = Awaited<ReturnType<typeof createTypedMessage>>;

export const broadcastTypedMessage = async ({
  messages,
  account,
  tx,
  signature,
}: PreparedTypedTx & { signature: string }) => {
  const pubkey = recoverPubkeyFromTypedMessage(signature as Hex, tx);

  const protoTx = new Tx({
    body: {
      memo: tx.message.memo,

      timeoutHeight: 0n,
      messages: messages.map((msg) => ({
        typeUrl: `/${msg.getType().typeName}`,
        value: msg.toBinary(),
      })),
    },

    authInfo: {
      fee: {
        amount: [...tx.message.fee.amount],
        gasLimit: BigInt(tx.message.fee.gas),
        payer: normalizeToCosmos(account.address),
      },

      signerInfos: [
        {
          modeInfo: {
            sum: {
              case: "single",
              value: {
                mode: SignMode.DIRECT,
              },
            },
          },

          sequence: account.sequence,
          publicKey: {
            typeUrl: `/${PubKey.typeName}`,
            value: new PubKey({
              key: fromHex(pubkey, "bytes"),
            }).toBinary(),
          },
        },
      ],
    },
    signatures: [fromHex(signature as Hex, "bytes")],
  });

  const res = await apiCosmosTxBroadcast(evmos.registry.cosmosRest, protoTx);
  if (res.tx_response.height === "0") {
    throw new Error("Transaction failed");
  }

  return res;
};
