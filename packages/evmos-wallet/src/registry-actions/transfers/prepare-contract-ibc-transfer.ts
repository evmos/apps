// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ics20Abi } from "@evmosapps/registry";
import { assertIf } from "helpers";

import {
  Address,
  isEvmosAddress,
  normalizeToEth,
  wagmiConfig,
} from "../../wallet";
import { Prefix, TokenAmount } from "../types";
import { getIBCChannelId, getTimeoutTimestamp } from "../utils";
import { simulateContract, writeContract } from "wagmi/actions";
import { getIBCDenom } from "../utils/get-ibc-denom";
import { getTokenByRef } from "../get-token-by-ref";

export const prepareContractIBCTransfer = async <T extends Prefix>({
  sender,
  receiver,
  token,
}: {
  sender: Address<T>;
  receiver: Address<Exclude<Prefix, T>>; // Can't IBC transfer to the same network
  token: TokenAmount;
}) => {
  assertIf(
    isEvmosAddress(sender),
    "Sender must be an EVMOS address to transfer through ICS20 contract"
  );
  const transferredToken = getTokenByRef(token.ref);

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
      getIBCDenom({
        sender,
        receiver,
        token: transferredToken,
      }),
      token.amount,
      senderAddressAsHex,
      receiver as string,
      {
        revisionNumber: 0n,
        revisionHeight: 0n,
      },
      getTimeoutTimestamp(),
      "",
    ],
  } as const;
  // TODO: Hardcoding gas estimation for now due to a bug in core
  // uncomment this when the bug is fixed
  // https://linear.app/altiplanic/issue/FSE-835/hardcode-gas-estimation-value
  //
  // const estimatedGas = buffGasEstimate(
  //   await evmosClient.estimateContractGas(args)
  // );
  const estimatedGas = 72000n;
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

export const writeContractIBCTransfer = async <T extends Prefix>({
  sender,
  receiver,
  token,
}: {
  sender: Address<T>;
  receiver: Address<Exclude<Prefix, T>>; // Can't IBC transfer to the same network
  token: TokenAmount;
}) => {
  const prepared = await prepareContractIBCTransfer({
    sender,
    receiver,
    token,
  });

  return await writeContract(wagmiConfig, prepared.tx);
};
