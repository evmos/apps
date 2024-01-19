// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { estimateGas, sendTransaction } from "wagmi/actions";
import { normalizeToEth, Address, wagmiConfig } from "../../wallet";
import { TokenAmount } from "../types";
import { buffGasEstimate } from "../utils/buff-gas-estimate";
import { raise } from "helpers";

export const prepareEvmTransfer = async ({
  receiver,
  amount,
}: {
  receiver: Address<"evmos">;
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
  receiver: Address<"evmos">;
  amount: TokenAmount;
}) => {
  const response = await prepareEvmTransfer({
    receiver: normalizeToEth(receiver),
    amount,
  });

  return sendTransaction(wagmiConfig, response.tx);
};
