import { prepareSendTransaction, sendTransaction } from "wagmi/actions";
import { normalizeToEth, Address } from "../../wallet";
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
  const response = await prepareSendTransaction({
    to: normalizeToEth(receiver),
    value: amount.amount,
  });

  return {
    tx: response,
    estimatedGas: buffGasEstimate(response.gas ?? raise("No gas estimate")),
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

  //Safe apps can not have data as undefined
  if (!response.tx.data) response.tx.data = "0x";

  return sendTransaction(response.tx);
};
