import { parseUnits } from "ethers/lib/utils.js";
import { useDispatch, useSelector } from "react-redux";
import {
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
  snackRequestRejected,
  StoreType,
} from "evmos-wallet";

import { WEVMOS_CONTRACT_ADDRESS } from "../../constants";
import { createContract } from "../contracts/contractHelper";
import { WEVMOS } from "../contracts/abis/WEVMOS/WEVMOS";
import WETH_ABI from "../contracts/abis/WEVMOS/WEVMOS.json";
import { ConvertProps } from "../types";
import { BigNumber } from "ethers";

export const useConvert = (useConvertProps: ConvertProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const WEVMOS = WEVMOS_CONTRACT_ADDRESS;

  const handleConfirmButton = async () => {
    useConvertProps.setConfirmClicked(true);
    if (wallet.evmosPubkey === null) {
      dispatch(snackRequestRejected());
      useConvertProps.setShow(false);
      return;
    }
    if (
      useConvertProps.inputValue === undefined ||
      useConvertProps.inputValue === null ||
      useConvertProps.inputValue === "" ||
      Number(useConvertProps.inputValue) === 0
    ) {
      return;
    }
    const amount = parseUnits(
      useConvertProps.inputValue,
      BigNumber.from(useConvertProps.item.decimals)
    );
    if (amount.gt(useConvertProps.balance.balanceFrom)) {
      return;
    }
    if (useConvertProps.balance.isIBCBalance) {
      try {
        const contract = await createContract(
          WEVMOS,
          WETH_ABI,
          wallet.extensionName
        );
        if (contract === null) {
          dispatch(snackErrorGeneratingTx());
          useConvertProps.setShow(false);
          return;
        }
        useConvertProps.setDisabled(true);
        const res = await (contract as WEVMOS).deposit({
          value: amount,
        });
        dispatch(
          snackBroadcastSuccessful(res.hash, "www.mintscan.io/evmos/txs/")
        );
      } catch (e) {
        // TODO: Add Sentry here!
        dispatch(snackErrorGeneratingTx());
      }
    } else {
      try {
        const contract = await createContract(
          WEVMOS,
          WETH_ABI,
          wallet.extensionName
        );
        if (contract === null) {
          dispatch(snackErrorGeneratingTx());
          useConvertProps.setShow(false);
          return;
        }
        useConvertProps.setDisabled(true);
        const res = await (contract as WEVMOS).withdraw(amount);
        dispatch(
          snackBroadcastSuccessful(res.hash, "www.mintscan.io/evmos/txs/")
        );
      } catch (e) {
        // TODO: Add Sentry here!
        dispatch(snackErrorGeneratingTx());
      }
    }
    useConvertProps.setShow(false);
  };

  return { handleConfirmButton };
};
