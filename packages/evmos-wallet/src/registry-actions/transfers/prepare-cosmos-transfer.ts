// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { MsgSend } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/bank/v1beta1/tx_pb";
import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";

import { Address, normalizeToCosmosAddress } from "../../wallet";
import { Prefix, TokenAmount } from "../types";
import { apiCosmosTxSimulate } from "../../api/cosmos-rest/api-cosmos-tx-simulate";
import { getChainByAddress } from "../get-chain-by-account";
import { assignGasEstimateToProtoTx } from "../utils/assign-gas-estimate-to-proto-tx";
import { buffGasEstimate } from "../utils/buff-gas-estimate";
import { createProtobufTransaction } from "../utils/create-protobuf-transaction";
import { getTokenByRef } from "../get-token-by-ref";

export const createProtobufMsgSend = async ({
  sender,
  receiver,
  token,
  mode,
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: TokenAmount;
  mode?: keyof typeof SignMode;
}) => {
  const transferredToken = getTokenByRef(token.ref);
  const message = new MsgSend({
    fromAddress: normalizeToCosmosAddress(sender),
    toAddress: normalizeToCosmosAddress(receiver),
    amount: [
      {
        amount: token.amount.toString(),
        denom: transferredToken.sourceDenom,
      },
    ],
  });
  return createProtobufTransaction({
    sender: sender,
    messages: [message],
    mode: mode,
  });
};

export const prepareCosmosTransfer = async <T extends Prefix>(params: {
  sender: Address<T>;
  receiver: Address<T>;
  token: TokenAmount;
}) => {
  const tx = await createProtobufMsgSend(params);
  const chain = getChainByAddress(params.sender);
  const gas = (await apiCosmosTxSimulate(chain.cosmosRest, tx)).gas_info
    .gas_used;
  const estimatedGas = buffGasEstimate(gas);

  return {
    estimatedGas,
    tx: assignGasEstimateToProtoTx(params.sender, tx, estimatedGas),
  };
};
