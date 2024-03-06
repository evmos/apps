// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { estimateGas, sendTransaction } from "wagmi/actions";

import { TokenAmount } from "../types";
import { buffGasEstimate } from "../utils/buff-gas-estimate";
import { raise } from "helpers";
import { Address } from "helpers/src/crypto/addresses/types";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { wagmiConfig } from "../../wallet";

export const prepareEvmTransfer = async ({
  receiver,
  amount,
}: {
  receiver: Address;
  amount: TokenAmount;
}) => {
  const args = {
    to: normalizeToEth(receiver),
    value: amount.amount,
  } as const;
  const gasEstimate = await estimateGas(wagmiConfig, {
    to: normalizeToEth(receiver),
    value: amount.amount,
  });
  return {
    tx: args,
    estimatedGas: buffGasEstimate(gasEstimate ?? raise("No gas estimate")),
  };
};

export const writeEvmTransfer = async ({
  receiver,
  amount,
}: {
  receiver: Address;
  amount: TokenAmount;
}) => {
  const response = await prepareEvmTransfer({
    receiver: normalizeToEth(receiver),
    amount,
  });
  // TODO: move it to prepareEvmTransfer or other function if it's needed.
  // Use estimatedGas instead of wagmi value.
  // The value that wagmi gives sometimes is not enough for the gas that the tx needs.
  const temp: {
    readonly to: `0x${string}`;
    readonly value: bigint;
    gas?: bigint;
  } = response.tx;

  temp.gas = response.estimatedGas;
  return sendTransaction(wagmiConfig, temp);
};
