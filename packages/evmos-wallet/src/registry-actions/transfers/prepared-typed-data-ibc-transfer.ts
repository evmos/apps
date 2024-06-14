// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Address } from "helpers/src/crypto/addresses/types";
import { MsgTransfer } from "@buf/cosmos_ibc.bufbuild_es/ibc/applications/transfer/v1/tx_pb";
import {
  DEFAULT_GAS_IBC,
  DEFAULT_MEMO_IBC,
} from "./prepare-contract-ibc-transfer";
import { TokenAmount } from "../types";
import { getTokenByRef } from "../get-token-by-ref";
import { getIBCDenom } from "../utils/get-ibc-denom";
import {
  broadcastTypedMessage,
  createTypedMessage,
} from "./prepare-typed-message";
import { getEvmosChainRef } from "../../wallet/actions/getEvmosIdentifier";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { getIBCChannelId } from "../utils/get-ibc-channel-id";
import { getTxTimeout } from "../utils/getTxTimeout";
import { signTypedDataMessage } from "../../wallet/actions/signTypedDataMessage";

export const prepareTypedDateIBCTransfer = async ({
  sender,
  receiver,
  token,
  memo = DEFAULT_MEMO_IBC,
  estimatedGas = DEFAULT_GAS_IBC,
}: {
  sender: Address;
  receiver: Address;
  token: TokenAmount;
  memo?: string;
  estimatedGas?: bigint;
}) => {
  const transferredToken = getTokenByRef(token.ref);
  const ibcDenom = getIBCDenom({
    sender,
    receiver,
    token: transferredToken,
  });

  const message = new MsgTransfer({
    sender: normalizeToCosmos(sender),
    receiver: normalizeToCosmos(receiver),
    sourceChannel: getIBCChannelId({
      sender,
      receiver,
    }),
    sourcePort: "transfer",

    timeoutHeight: await getTxTimeout(sender),
    memo,
    token: {
      amount: token.amount.toString(),
      denom: ibcDenom,
    },
  });
  const chainRef = getEvmosChainRef();
  const tx = await createTypedMessage(chainRef, {
    messages: [message],
    sender,
    gasLimit: estimatedGas,
  });

  return {
    tx,
    estimatedGas,
  };
};

export const writeTypedDataIBCTransfer = async ({
  sender,
  receiver,
  token,
  memo = DEFAULT_MEMO_IBC,
  estimatedGas = DEFAULT_GAS_IBC,
}: {
  sender: Address;
  receiver: Address;
  token: TokenAmount;
  memo?: string;
  estimatedGas?: bigint;
}) => {
  const { tx: typedMessage } = await prepareTypedDateIBCTransfer({
    sender,
    receiver,
    token,
    memo,
    estimatedGas,
  });

  const chainRef = getEvmosChainRef();

  const signature = await signTypedDataMessage(typedMessage.tx);

  const response = await broadcastTypedMessage(chainRef, {
    ...typedMessage,
    signature,
  });

  return response.tx_response.txhash;
};
