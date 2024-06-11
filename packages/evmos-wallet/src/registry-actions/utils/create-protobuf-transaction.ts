// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";
import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";
import { Message, Any } from "@bufbuild/protobuf";

import { getChainByAddress } from "../get-chain-by-account";

import { getChainAccountInfo } from "./get-chain-account-info";
import { Address } from "helpers/src/crypto/addresses/types";

export const createProtobufTransaction = async ({
  sender,
  messages,
  memo = "",
  mode = "DIRECT",
  fee,
}: {
  sender: Address;
  messages: Message[];
  memo?: string;
  mode?: keyof typeof SignMode;
  fee?: {
    amount: [
      {
        amount: string;
        denom: string;
      },
    ];
    gasLimit: bigint;
  };
}) => {
  const chain = getChainByAddress(sender);
  const { publicKey, sequence } = await getChainAccountInfo(sender);

  if (!publicKey) {
    throw new Error("Public key not found");
  }
  return new Tx({
    body: {
      memo: memo,
      messages: messages.map(
        (msg) =>
          new Any({
            typeUrl: `/${msg.getType().typeName}`,
            value: msg.toBinary(),
          }),
      ),
    },
    authInfo: {
      signerInfos: [
        {
          publicKey: new Any({
            typeUrl: `/${publicKey.getType().typeName}`,
            value: publicKey.toBinary(),
          }),
          modeInfo: {
            sum: {
              case: "single",
              value: {
                mode: SignMode[mode],
              },
            },
          },
          sequence,
        },
      ],
      fee: fee ?? {
        amount: [
          {
            amount: "0",
            denom: chain.feeToken,
          },
        ],
        gasLimit: 0n,
      },
    },
    signatures: [new Uint8Array()],
  });
};
