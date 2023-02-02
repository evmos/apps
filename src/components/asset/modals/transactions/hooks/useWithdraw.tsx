import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import { useDispatch, useSelector } from "react-redux";
import { BROADCASTED_NOTIFICATIONS } from "../../../../../internal/asset/functionality/transactions/errors";
import { IBCChainParams } from "../../../../../internal/asset/functionality/transactions/types";
import { executeWithdraw } from "../../../../../internal/asset/functionality/transactions/withdraw";
import {
  snackbarExecutedTx,
  snackbarIncludedInBlock,
  snackbarWaitingBroadcast,
} from "../../../../../internal/asset/style/format";
import {
  snackExecuteIBCTransfer,
  snackIBCInformation,
  snackRequestRejected,
} from "../../../../../internal/asset/style/snackbars";
import { EVMOS_SYMBOL } from "../../../../../internal/wallet/functionality/networkConfig";
import { StoreType } from "../../../../../redux/Store";
import { WithdrawProps } from "../types";

export const useWithdraw = (useWithdrawProps: WithdrawProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  const handleConfirmButton = async () => {
    useWithdrawProps.setConfirmClicked(true);
    if (wallet.evmosPubkey === null) {
      dispatch(snackRequestRejected());
      useWithdrawProps.setShow(false);
      return;
    }
    // avoid withdraw if token is not selected
    if (useWithdrawProps.token === undefined) {
      return;
    }

    if (
      useWithdrawProps.inputValue === undefined ||
      useWithdrawProps.inputValue === null ||
      useWithdrawProps.inputValue === "" ||
      useWithdrawProps.inputValue === "0" ||
      useWithdrawProps.receiverAddress === undefined ||
      useWithdrawProps.receiverAddress === null ||
      useWithdrawProps.receiverAddress === ""
    ) {
      return;
    }
    const amount = parseUnits(
      useWithdrawProps.inputValue,
      BigNumber.from(useWithdrawProps.token.decimals)
    );

    if (amount.gt(useWithdrawProps.token.erc20Balance)) {
      return;
    }

    const params: IBCChainParams = {
      sender: useWithdrawProps.address,
      receiver: useWithdrawProps.receiverAddress,
      amount: amount.toString(),
      srcChain: EVMOS_SYMBOL,
      dstChain: useWithdrawProps.token.chainIdentifier,
      token: useWithdrawProps.token.symbol,
    };
    useWithdrawProps.setDisabled(true);

    dispatch(snackIBCInformation());
    // create, sign and broadcast tx
    const res = await executeWithdraw(
      wallet.evmosPubkey,
      wallet.evmosAddressCosmosFormat,
      params,
      useWithdrawProps.feeBalance,
      wallet.extensionName,
      useWithdrawProps.token.prefix
    );

    dispatch(snackExecuteIBCTransfer(res));
    useWithdrawProps.setShow(false);
    // check if tx is executed
    if (res.title === BROADCASTED_NOTIFICATIONS.SuccessTitle) {
      dispatch(snackbarWaitingBroadcast());
      dispatch(
        await snackbarIncludedInBlock(
          res.txHash,
          EVMOS_SYMBOL,
          res.explorerTxUrl
        )
      );
      dispatch(await snackbarExecutedTx(res.txHash, EVMOS_SYMBOL));
    }
  };
  return { handleConfirmButton };
};
