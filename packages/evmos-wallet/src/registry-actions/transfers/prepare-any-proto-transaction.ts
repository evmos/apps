import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";
import { apiCosmosTxSimulate } from "../../api/cosmos-rest/api-cosmos-tx-simulate";

import { Address, getKeplrProvider } from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { Prefix, TokenAmount } from "../types";

import { assignGasEstimateToProtoTx } from "../utils/assign-gas-estimate-to-proto-tx";
import { createProtobufTransaction } from "../utils/create-protobuf-transaction";
import { buffGasEstimate } from "../utils/buff-gas-estimate";

import { apiCosmosTxBroadcast } from "../../api/cosmos-rest/api-cosmos-tx-broadcast";
import { getChainAccountInfo } from "../utils/get-chain-account-info";
import { Hex } from "viem";
import { getTokenByRef } from "../get-token-by-ref";
import { Message } from "@bufbuild/protobuf";

export const createProtoTransaction = ({
  sender,
  mode,
  fee,
  messages,
}: {
  sender: Address<Prefix>;
  messages: Message[];
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
  mode?: keyof typeof SignMode;
}) => {
  const feeToken = fee && getTokenByRef(fee.token.ref);

  return createProtobufTransaction({
    sender,
    messages,
    mode,
    fee: feeToken && {
      amount: [
        {
          amount: fee.token.amount.toString(),
          denom: feeToken.sourceDenom,
        },
      ],
      gasLimit: fee.gasLimit,
    },
  });
};

export const prepareProtoTransaction = async (params: {
  sender: Address<Prefix>;
  messages: Message[];
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
  mode?: keyof typeof SignMode;
}) => {
  const tx = await createProtoTransaction(params);
  const chain = getChainByAddress(params.sender);
  const gas = (await apiCosmosTxSimulate(chain.cosmosRest, tx)).gas_info
    .gas_used;
  const estimatedGas = buffGasEstimate(gas);

  return {
    estimatedGas,
    tx: assignGasEstimateToProtoTx(params.sender, tx, estimatedGas),
  };
};

export const executeProtoTransaction = async (params: {
  sender: Address<Prefix>;
  messages: Message[];
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
  mode?: keyof typeof SignMode;
}) => {
  const tx = await createProtoTransaction(params);
  const keplr = await getKeplrProvider();
  const chain = getChainByAddress(params.sender);

  const { accountNumber } = await getChainAccountInfo(params.sender);
  const signature = await keplr.signDirect(chain.cosmosId, params.sender, {
    // @ts-expect-error This is typed as `Long`, but it does accept a string,
    // I'd rather not have yet another library to do what native bigint does
    accountNumber: accountNumber.toString(),
    authInfoBytes: tx.authInfo?.toBinary(),
    bodyBytes: tx.body?.toBinary(),
    chainId: chain.cosmosId,
  });

  tx.signatures = [Buffer.from(signature.signature.signature, "base64")];

  const response = await apiCosmosTxBroadcast(chain.cosmosRest, tx);
  const hash: Hex = `0x${response.tx_response.txhash}`;

  return {
    hash,
    ...response,
  };
};
