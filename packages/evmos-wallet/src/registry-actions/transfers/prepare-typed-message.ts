// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Message } from "@bufbuild/protobuf";
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
import { getEvmosConfig } from "../../wallet/actions/getEvmosIdentifier";
import { fetchChainByRef } from "@evmosapps/trpc/procedures/chains/queries/chain-by-ref/fetch-chain-by-ref";
import { cosmos } from "helpers/src/clients/cosmos";

export const createTypedMessage = async (
  chainRef: string,
  {
    sender,
    messages,
    gasLimit = 10500000n,
  }: {
    sender: Address;
    messages: Message[];
    gasLimit?: bigint;
  },
) => {
  // const account = await getChainAccountInfo(sender);
  const account = await cosmos(chainRef).GET(
    "/cosmos/auth/v1beta1/account_info/{address}",
    { params: { path: { address: normalizeToCosmos(sender) } } },
  );
  const accountNumber = account.data?.info?.account_number;
  const sequence = account.data?.info?.sequence;
  if (!accountNumber || !sequence) {
    throw new Error("Account number or sequence not found");
  }

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

  const chainInfo = await fetchChainByRef(chainRef);

  const chainId = getChainId(wagmiConfig);
  const chainConfig = getEvmosConfig();

  return {
    messages,
    tx: {
      types: encodeEvmosEIP712Types(serializedMsgs),
      primaryType: "Tx",

      domain: {
        name: "Cosmos Web3",
        version: "1.0.0",
        chainId: toHex(chainId),
        verifyingContract: "cosmos",
        salt: "0",
      },
      message: {
        account_number: accountNumber,
        chain_id: chainConfig.cosmosChainId,
        fee: {
          amount: [
            {
              amount: multiply(
                gasLimit,
                chainInfo.gasPriceStep.average,
              ).toString(),
              denom: chainInfo.currencies[0]?.coinMinDenom ?? "aevmos",
            },
          ],
          gas: gasLimit.toString(),
        },
        memo: "",
        ...Object.fromEntries(serializedMsgs.map((msg, i) => [`msg${i}`, msg])),
        sequence,
      },
    } as const,
    account: {
      address: sender,
      accountNumber,
      sequence,
    },
  } as const;
};

type PreparedTypedTx = Awaited<ReturnType<typeof createTypedMessage>>;

export const broadcastTypedMessage = async (
  chainRef: string,
  { messages, account, tx, signature }: PreparedTypedTx & { signature: string },
) => {
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

          sequence: BigInt(account.sequence),
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

  const chainInfo = await fetchChainByRef(chainRef);

  const res = await apiCosmosTxBroadcast(
    chainInfo.rest as [string, ...string[]],
    protoTx,
  );
  if (res.tx_response.code !== 0) {
    throw new Error(`Transaction failed: ${res.tx_response.raw_log}`);
  }

  return res;
};
