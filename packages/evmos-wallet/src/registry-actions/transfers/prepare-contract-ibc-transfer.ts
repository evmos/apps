// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ics20Abi } from "@evmosapps/registry";
import { assert } from "helpers";

import { wagmiConfig } from "../../wallet";
import { TokenAmount } from "../types";
import { getIBCChannelId, getTimeoutTimestamp } from "../utils";
import { simulateContract, writeContract } from "wagmi/actions";
import { getIBCDenom } from "../utils/get-ibc-denom";
import { getTokenByRef } from "../get-token-by-ref";
import { Address } from "helpers/src/crypto/addresses/types";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { isEvmosAddress } from "helpers/src/crypto/addresses/is-evmos-address";

export const DEFAULT_MEMO_IBC = "";
export const DEFAULT_GAS_IBC = 120000n;

const createIBCArgs = (
  sender: string,
  receiver: string,
  ibcDenom: string,
  tokenAmount: bigint,
  memo: string,
) => {
  const senderAddressAsHex = normalizeToEth(sender);

  const args = {
    abi: ics20Abi,
    address: "0x0000000000000000000000000000000000000802",
    account: senderAddressAsHex,
    functionName: "transfer",
    args: [
      "transfer",
      getIBCChannelId({
        sender,
        receiver,
      }),
      ibcDenom,
      tokenAmount,
      senderAddressAsHex,
      receiver,
      // TODO: should we set the revision number and height?
      {
        revisionNumber: 0n,
        revisionHeight: 0n,
      },
      getTimeoutTimestamp(),
      memo,
    ],
  } as const;

  return args;
};

const prepareContractIBCTransferInternal = async (
  sender: Address,
  receiver: string,
  tokenAmount: bigint,
  ibcDenom: string,
  memo: string,
  estimatedGas: bigint,
) => {
  assert(
    isEvmosAddress(sender),
    "Sender must be an EVMOS address to transfer through ICS20 contract",
  );

  const args = createIBCArgs(sender, receiver, ibcDenom, tokenAmount, memo);

  // TODO: Hardcoding gas estimation for now due to a bug in core
  // uncomment this when the bug is fixed
  // https://linear.app/altiplanic/issue/FSE-835/hardcode-gas-estimation-value
  //
  // const estimatedGas = buffGasEstimate(
  //   await evmosClient.estimateContractGas(args)
  // );
  const { request } = await simulateContract(wagmiConfig, {
    ...args,
    gas: estimatedGas,
  });
  // @ts-expect-error "Safe Wallet" SDK has a bug where this value can't be undefined
  // https://github.com/wagmi-dev/wagmi/issues/2887
  request.value = 0n;

  return {
    tx: request,
    estimatedGas,
  };
};

export const prepareContractIBCTransfer = async ({
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

  return prepareContractIBCTransferInternal(
    sender,
    receiver,
    token.amount,
    ibcDenom,
    memo,
    estimatedGas,
  );
};

export const writeContractIBCTransfer = async ({
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
  const prepared = await prepareContractIBCTransfer({
    sender,
    receiver,
    token,
    memo,
    estimatedGas,
  });

  return await writeContract(wagmiConfig, prepared.tx);
};

export const writeContractIBCOutpost = async ({
  sender,
  receiver,
  tokenAmount,
  tokenDenom,
  memo,
  estimatedGas = DEFAULT_GAS_IBC,
}: {
  sender: Address;
  receiver: string;
  tokenAmount: bigint;
  tokenDenom: string;
  memo: string;
  estimatedGas?: bigint;
}) => {
  const prepared = await prepareContractIBCTransferInternal(
    sender,
    receiver,
    tokenAmount,
    tokenDenom,
    memo,
    estimatedGas,
  );

  return await writeContract(wagmiConfig, prepared.tx);
};
