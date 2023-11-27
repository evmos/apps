import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";
import { MsgTransfer } from "@buf/cosmos_ibc.bufbuild_es/ibc/applications/transfer/v1/tx_pb";
import { apiCosmosTxSimulate } from "../../api/cosmos-rest/api-cosmos-tx-simulate";

import {
  Address,
  getKeplrProvider,
  normalizeToCosmosAddress,
} from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { Prefix, TokenAmount } from "../types";
import { getIBCChannelId } from "../utils";
import { assignGasEstimateToProtoTx } from "../utils/assign-gas-estimate-to-proto-tx";
import { createProtobufTransaction } from "../utils/create-protobuf-transaction";
import { buffGasEstimate } from "../utils/buff-gas-estimate";
import { getIBCDenom } from "../utils/get-ibc-denom";
import { apiCosmosTxBroadcast } from "../../api/cosmos-rest/api-cosmos-tx-broadcast";
import { getChainAccountInfo } from "../utils/get-chain-account-info";
import { Hex } from "viem";
import { getTokenByRef } from "../get-token-by-ref";
import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";
import { Keplr } from "@keplr-wallet/types";
import { getTxTimeout } from "../utils/getTxTimeout";
import { raise } from "helpers";

export const createProtobufIBCTransferMsg = async ({
  sender,
  receiver,
  token,

  mode,
  fee,
  ...rest
}: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: TokenAmount;
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
  mode?: keyof typeof SignMode;
}) => {
  const transferredToken = getTokenByRef(token.ref);
  const feeToken = fee && getTokenByRef(fee.token.ref);
  const ibcDenom = getIBCDenom({
    sender,
    receiver,
    token: transferredToken,
  });
  const message = new MsgTransfer({
    sender: normalizeToCosmosAddress(sender),
    receiver: normalizeToCosmosAddress(receiver),
    sourceChannel: getIBCChannelId({
      sender,
      receiver,
    }),
    sourcePort: "transfer",

    timeoutHeight: await getTxTimeout(sender),
    memo: "",
    token: {
      amount: token.amount.toString(),
      denom: ibcDenom,
    },
    ...rest,
  });

  return createProtobufTransaction({
    sender,
    messages: [message],
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

export const prepareCosmosIBCTransfer = async (params: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: TokenAmount;
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
  mode?: keyof typeof SignMode;
}) => {
  const tx = await createProtobufIBCTransferMsg(params);
  const chain = getChainByAddress(params.sender);
  const gas = (await apiCosmosTxSimulate(chain.cosmosRest, tx)).gas_info
    .gas_used;
  const estimatedGas = buffGasEstimate(gas);

  return {
    estimatedGas,
    tx: assignGasEstimateToProtoTx(params.sender, tx, estimatedGas),
  };
};

const signDirect = async (tx: Tx, ...args: Parameters<Keplr["signDirect"]>) => {
  const keplr = await getKeplrProvider();

  const signature = await keplr.signDirect(...args);
  tx.signatures = [Buffer.from(signature.signature.signature, "base64")];
  return tx;
};

const signAmino = async (
  tx: Tx,
  ...[chainId, sender, signDoc]: Parameters<Keplr["signAmino"]>
) => {
  const keplr = await getKeplrProvider();

  const signer = keplr.getOfflineSignerOnlyAmino(chainId);

  const signature = await signer.signAmino(sender, signDoc);

  tx.signatures = [Buffer.from(signature.signature.signature, "base64")];

  return tx;
};

export const executeCosmosIBCTransfer = async (params: {
  sender: Address<Prefix>;
  receiver: Address<Prefix>;
  token: TokenAmount;
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
  mode?: keyof typeof SignMode;
}) => {
  const { mode = "DIRECT" } = params;
  let tx = await createProtobufIBCTransferMsg(params);

  const chain = getChainByAddress(params.sender);

  const { accountNumber } = await getChainAccountInfo(params.sender);
  if (mode === "DIRECT") {
    tx = await signDirect(
      tx,
      chain.cosmosId,
      params.sender,
      {
        // @ts-expect-error This is typed as `Long`, but it does accept a string,
        // I'd rather not have yet another library to do what native bigint does
        accountNumber: accountNumber.toString(),
        authInfoBytes: tx.authInfo?.toBinary(),
        bodyBytes: tx.body?.toBinary(),
        chainId: chain.cosmosId,
      },
      {
        preferNoSetFee: true,
      }
    );
  } else if (mode === "LEGACY_AMINO_JSON") {
    const fee = tx.authInfo?.fee;
    const msgs = tx.body?.messages ?? [];
    tx = await signAmino(tx, chain.cosmosId, params.sender, {
      account_number: accountNumber,
      chain_id: chain.cosmosId,
      fee: {
        amount: fee?.amount ?? [],
        gas: fee?.gasLimit!.toString() ?? "0",
      },
      memo: tx.body?.memo ?? "",
      msgs: [
        {
          type: "cosmos-sdk/MsgTransfer",
          value: MsgTransfer.fromBinary(
            msgs[0]?.value ?? raise("No message")
          ).toJson({
            useProtoFieldName: true,
          }),
        },
      ],

      sequence: tx.authInfo!.signerInfos[0]?.sequence.toString() ?? "0",
    });
  } else {
    throw new Error("UNSUPPORTED_SIGN_MODE");
  }

  const response = await apiCosmosTxBroadcast(chain.cosmosRest, tx);
  const hash: Hex = `0x${response.tx_response.txhash}`;

  return {
    hash,
    ...response,
  };
};
