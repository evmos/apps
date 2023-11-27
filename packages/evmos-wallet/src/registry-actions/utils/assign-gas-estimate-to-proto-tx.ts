import { Address } from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { Tx } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/v1beta1/tx_pb";
import { Prefix } from "../types";
import { set } from "lodash-es";

export const assignGasEstimateToProtoTx = (
  sender: Address<Prefix>,
  tx: Tx,
  estimatedGas: bigint
) => {
  tx = tx.clone();

  if (tx.authInfo?.fee) {
    tx.authInfo.fee.gasLimit = estimatedGas;
    const chain = getChainByAddress(sender);
    const average = chain.gasPriceStep.average;
    let feeAmount = estimatedGas;
    try {
      feeAmount = estimatedGas * BigInt(average);
    } catch (e) {
      // if it throws, its probably a float
      feeAmount =
        (estimatedGas * BigInt(~~(parseFloat(average) * 1000))) / 1000n;
    }

    set(tx, "authInfo.fee.amount[0].amount", feeAmount.toString());
  }
  return tx;
};
