// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useDispatch, useSelector } from "react-redux";

import {
  E,
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
  getKeplrAccountPubKey,
  normalizeToEvmos,
} from "@evmosapps/evmos-wallet";
import {
  CLICK_DEPOSIT_CONFIRM_BUTTON,
  useTracker,
  SUCCESSFUL_TX_DEPOSIT,
  UNSUCCESSFUL_TX_DEPOSIT,
} from "tracker";
import { NEOK_IBC_DENOM_MAP } from "../neok-ibc-map";
import {
  snackbarWaitingBroadcast,
  snackbarIncludedInBlock,
  snackbarExecutedTx,
} from "../../../../utils/format";
import { executeDeposit } from "../../../../utils/transactions/deposit";

export const useDeposit = (useDepositProps: DepositProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_DEPOSIT_CONFIRM_BUTTON);
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_DEPOSIT
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_DEPOSIT
  );
  const handleConfirmButton = async () => {
    handlePreClickAction({
      wallet: wallet?.evmosAddressEthFormat,
      provider: wallet?.extensionName,
    });
    useDepositProps.setConfirmClicked(true);
    const [, osmosisPubkey] = await E.try(() =>
      getKeplrAccountPubKey("osmosis-1")
    );

    if (!osmosisPubkey) {
      dispatch(snackRequestRejected());
      useDepositProps.setIsOpen(false);
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

    const addressEvmos = normalizeToEvmos(useDepositProps.receiverAddress);

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
    // hardcoding neok support for now, new modal will not have this, I promise
    if (useDepositProps.token.symbol === "NEOK") {
      params.token = NEOK_IBC_DENOM_MAP[prefix] ?? params.token;
    }
    // create, sign and broadcast tx
    const res = await executeDeposit(
      osmosisPubkey,
      keplrAddress,
      params,
      prefix,
      chainIds.chainIdentifier
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
    useDepositProps.setIsOpen(false);
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
