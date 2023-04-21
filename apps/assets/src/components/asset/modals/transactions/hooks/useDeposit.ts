// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ethToEvmos } from "@evmos/address-converter";
import { BigNumber } from "ethers";
import { parseUnits } from "@ethersproject/units";
import { useDispatch, useSelector } from "react-redux";
import { executeDeposit } from "../../../../../internal/asset/functionality/transactions/deposit";
import {
  snackbarExecutedTx,
  snackbarIncludedInBlock,
  snackbarWaitingBroadcast,
} from "../../../../../internal/asset/style/format";
import {
  checkFormatAddress,
  checkMetaMaskFormatAddress,
  getChainIds,
  getPrefix,
} from "helpers";
import { DepositProps } from "../types";
import {
  BROADCASTED_NOTIFICATIONS,
  IBCChainParams,
  snackExecuteIBCTransfer,
  snackIBCInformation,
  snackRequestRejected,
  getKeplrAddressByChain,
  EVMOS_SYMBOL,
  StoreType,
} from "evmos-wallet";
export const useDeposit = (useDepositProps: DepositProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  const handleConfirmButton = async () => {
    useDepositProps.setConfirmClicked(true);
    if (wallet.osmosisPubkey === null) {
      dispatch(snackRequestRejected());
      useDepositProps.setShow(false);
      return;
    }
    if (useDepositProps.token === undefined) {
      return;
    }

    if (
      useDepositProps.inputValue === undefined ||
      useDepositProps.inputValue === null ||
      useDepositProps.inputValue === "" ||
      Number(useDepositProps.inputValue) === 0 ||
      useDepositProps.receiverAddress === undefined ||
      useDepositProps.receiverAddress === null ||
      useDepositProps.receiverAddress === ""
    ) {
      return;
    }
    const amount = parseUnits(
      useDepositProps.inputValue,
      BigNumber.from(useDepositProps.token.decimals)
    );
    if (amount.gt(useDepositProps.balance)) {
      return;
    }

    if (
      !checkFormatAddress(useDepositProps.receiverAddress, "evmos") &&
      !checkMetaMaskFormatAddress(useDepositProps.receiverAddress)
    ) {
      return;
    }
    const chainIds = getChainIds(
      useDepositProps.token,
      useDepositProps.chain?.elements[0]
    );
    if (
      chainIds.chainId === "" ||
      chainIds.chainId === undefined ||
      chainIds.chainIdentifier === "" ||
      chainIds.chainIdentifier === undefined
    ) {
      // TODO: snackbar?
      return;
    }

    const keplrAddress = await getKeplrAddressByChain(chainIds.chainId);
    if (keplrAddress === null) {
      return;
    }

    let addressEvmos = useDepositProps.receiverAddress;
    if (useDepositProps.receiverAddress.startsWith("0x")) {
      addressEvmos = ethToEvmos(useDepositProps.receiverAddress);
    }
    const params: IBCChainParams = {
      sender: keplrAddress,
      receiver: addressEvmos,
      amount: amount.toString(),
      srcChain: chainIds.chainIdentifier,
      dstChain: EVMOS_SYMBOL,
      token: useDepositProps.token.symbol,
    };
    useDepositProps.setDisabled(true);

    dispatch(snackIBCInformation());

    const prefix = getPrefix(
      useDepositProps.token,
      useDepositProps.chain?.elements[0],
      params.sender
    );

    if (prefix === undefined) {
      // TODO: snackbar?
      return;
    }
    // create, sign and broadcast tx
    const res = await executeDeposit(
      wallet.osmosisPubkey,
      keplrAddress,
      params,
      chainIds.chainIdentifier.toUpperCase(),
      wallet.extensionName,
      prefix,
      chainIds.chainId,
      chainIds.chainIdentifier
    );

    dispatch(snackExecuteIBCTransfer(res));
    useDepositProps.setShow(false);
    // check if tx is executed
    if (res.title === BROADCASTED_NOTIFICATIONS.SuccessTitle) {
      dispatch(snackbarWaitingBroadcast());
      dispatch(
        await snackbarIncludedInBlock(
          res.txHash,
          chainIds.chainIdentifier.toUpperCase(),
          res.explorerTxUrl
        )
      );

      dispatch(
        await snackbarExecutedTx(
          res.txHash,
          chainIds.chainIdentifier.toUpperCase()
        )
      );
    }
  };

  return { handleConfirmButton };
};
