// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch, useSelector } from "react-redux";

import { ConvertProps } from "../types";
import { BigNumber } from "@ethersproject/bignumber";
import {
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
  snackRequestRejected,
  StoreType,
} from "evmos-wallet";
import {
  useTracker,
  CLICK_BUTTON_CONFIRM_WRAP_TX,
  SUCCESSFUL_WRAP_TX,
  UNSUCCESSFUL_WRAP_TX,
} from "tracker";
import { GENERATING_TX_NOTIFICATIONS } from "../../../../../internal/asset/functionality/transactions/errors";
import { useWEVMOS } from "../contracts/hooks/useWEVMOS";
import { parseUnits } from "@ethersproject/units";
import { useAccount } from "wagmi";

const wrapEvmos = "EVMOS <> WEVMOS";
const unwrapEvmos = "WEVMOS <> EVMOS";
export const useConvert = (useConvertProps: ConvertProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const { connector } = useAccount();
  const dispatch = useDispatch();

  const { deposit, withdraw } = useWEVMOS();

  const { handlePreClickAction: clickConfirmWrapTx } = useTracker(
    CLICK_BUTTON_CONFIRM_WRAP_TX
  );

  const { handlePreClickAction: successfulTx } = useTracker(SUCCESSFUL_WRAP_TX);

  const { handlePreClickAction: unsuccessfulTx } =
    useTracker(UNSUCCESSFUL_WRAP_TX);

  const handleConfirmButton = async () => {
    clickConfirmWrapTx({
      convert: useConvertProps.balance.isIBCBalance ? wrapEvmos : unwrapEvmos,
      wallet: wallet?.evmosAddressEthFormat,
      provider: wallet?.extensionName,
    });

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
        useConvertProps.setDisabled(true);

        const res = await deposit(amount, wallet.evmosAddressEthFormat);

        dispatch(
          snackBroadcastSuccessful(res.hash, "www.mintscan.io/evmos/txs/")
        );
        successfulTx({
          txHash: res.hash,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "successful",
          convert: wrapEvmos,
        });
      } catch (e) {
        console.log("error", e);
        // TODO: Add Sentry here!
        dispatch(snackErrorGeneratingTx());
        unsuccessfulTx({
          errorMessage: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "unsuccessful",
          convert: wrapEvmos,
        });
      }
    } else {
      try {
        useConvertProps.setDisabled(true);

        const res = await withdraw(
          amount,
          wallet.evmosAddressEthFormat,
          connector?.id
        );

        dispatch(
          snackBroadcastSuccessful(res.hash, "www.mintscan.io/evmos/txs/")
        );
        successfulTx({
          txHash: res.hash,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "successful",
          convert: unwrapEvmos,
        });
      } catch (e) {
        console.log("error", e);
        // TODO: Add Sentry here!
        dispatch(snackErrorGeneratingTx());
        unsuccessfulTx({
          errorMessage: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "unsuccessful",
          convert: unwrapEvmos,
        });
      }
    }
    useConvertProps.setShow(false);
  };

  return { handleConfirmButton };
};
