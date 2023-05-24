// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "ethers";
import { parseUnits } from "@ethersproject/units";
import { useDispatch, useSelector } from "react-redux";
import { executeWithdraw } from "../../../../../internal/asset/functionality/transactions/withdraw";
import {
  snackbarExecutedTx,
  snackbarIncludedInBlock,
  snackbarWaitingBroadcast,
} from "../../../../../internal/asset/style/format";
import { checkFormatAddress, getPrefix } from "helpers";
import { WithdrawProps } from "../types";
import {
  BROADCASTED_NOTIFICATIONS,
  IBCChainParams,
  snackExecuteIBCTransfer,
  snackIBCInformation,
  snackRequestRejected,
  EVMOS_SYMBOL,
  StoreType,
} from "evmos-wallet";
import {
  CLICK_WITHDRAW_CONFIRM_BUTTON,
  useTracker,
  SUCCESSFUL_TX_WITHDRAW,
  UNSUCCESSFUL_TX_WITHDRAW,
} from "tracker";

export const useWithdraw = (useWithdrawProps: WithdrawProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_WITHDRAW_CONFIRM_BUTTON);
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_WITHDRAW
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_WITHDRAW
  );
  const handleConfirmButton = async () => {
    handlePreClickAction({
      wallet: wallet?.evmosAddressEthFormat,
      provider: wallet?.extensionName,
    });
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
      useWithdrawProps.receiverAddress === undefined ||
      useWithdrawProps.receiverAddress === null ||
      useWithdrawProps.receiverAddress === "" ||
      Number(useWithdrawProps.inputValue) === 0
    ) {
      return;
    }
    const amount = parseUnits(
      useWithdrawProps.inputValue,
      BigNumber.from(useWithdrawProps.token.decimals)
    );
    let prefixTemp = useWithdrawProps.token.prefix;
    let chainIdentifier = useWithdrawProps.token.chainIdentifier;
    let balance = useWithdrawProps.token.erc20Balance;
    let useERC20Denom = true;
    if (
      useWithdrawProps.token.symbol === EVMOS_SYMBOL &&
      useWithdrawProps.chain !== undefined
    ) {
      chainIdentifier = useWithdrawProps.chain.chainIdentifier;
      // evmos keeps using cosmosBalance
      balance = useWithdrawProps.token.cosmosBalance;
      useERC20Denom = false;
      prefixTemp = useWithdrawProps.chain.prefix;
    }

    if (amount.gt(balance)) {
      return;
    }

    if (!checkFormatAddress(useWithdrawProps.receiverAddress, prefixTemp)) {
      return;
    }

    const params: IBCChainParams = {
      sender: useWithdrawProps.address,
      receiver: useWithdrawProps.receiverAddress,
      amount: amount.toString(),
      srcChain: EVMOS_SYMBOL,
      dstChain: chainIdentifier,
      token: useWithdrawProps.token.symbol,
    };
    useWithdrawProps.setDisabled(true);

    dispatch(snackIBCInformation());

    const prefix = getPrefix(
      useWithdrawProps.token,
      useWithdrawProps.chain,
      params.receiver
    );

    if (prefix === undefined) {
      // TODO: snackbar?
      return;
    }
    // create, sign and broadcast tx
    const res = await executeWithdraw(
      wallet.evmosPubkey,
      wallet.evmosAddressCosmosFormat,
      params,
      useWithdrawProps.feeBalance,
      wallet.extensionName,
      prefix,
      useERC20Denom
    );

    dispatch(snackExecuteIBCTransfer(res));
    if (res.error) {
      unsuccessfulTx({
        errorMessage: res.message,
        wallet: wallet?.evmosAddressEthFormat,
        provider: wallet?.extensionName,
        transaction: "unsuccessful",
      });
    }
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
      successfulTx({
        txHash: res.txHash,
        wallet: wallet?.evmosAddressEthFormat,
        provider: wallet?.extensionName,
        transaction: "successful",
      });
    }
  };
  return { handleConfirmButton };
};
