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
} from "@evmosapps/evmos-wallet";
import { SUCCESSFUL_WRAP_TX, UNSUCCESSFUL_WRAP_TX, sendEvent } from "tracker";

import { useWEVMOS } from "../contracts/hooks/useWEVMOS";
import { parseUnits } from "@ethersproject/units";
import { Log } from "helpers";
import { EXPLORER_URL } from "constants-helper";

import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { GENERATING_TX_NOTIFICATIONS } from "../../../../utils/transactions/errors";
import { useConfig } from "wagmi";
import { getChainId, switchChain } from "wagmi/actions";

const evmos = getEvmosChainInfo();

export const useConvert = (useConvertProps: ConvertProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const config = useConfig();

  const { deposit, withdraw } = useWEVMOS();

  const handleConfirmButton = async () => {
    if (getChainId(config) !== evmos.id) {
      const [err] = await E.try(() =>
        switchChain(config, {
          chainId: evmos.id,
        }),
      );
      if (err) return;
    }

    useConvertProps.setConfirmClicked(true);
    if (wallet.evmosPubkey === null) {
      dispatch(snackRequestRejected());
      useConvertProps.setIsOpen(false);
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
      BigNumber.from(useConvertProps.item.decimals),
    );
    if (amount.gt(useConvertProps.balance.balanceFrom)) {
      return;
    }
    if (useConvertProps.balance.isIBCBalance) {
      try {
        useConvertProps.setDisabled(true);

        const hash = await deposit(amount, wallet.evmosAddressEthFormat);

        dispatch(snackBroadcastSuccessful(hash, `${EXPLORER_URL}/tx/`));
        sendEvent(SUCCESSFUL_WRAP_TX, {
          "User Wallet Address": wallet?.evmosAddressEthFormat,
          "Wallet Provider": wallet?.extensionName,
        });
      } catch (e) {
        Log().error(e);
        dispatch(snackErrorGeneratingTx());
        sendEvent(UNSUCCESSFUL_WRAP_TX, {
          "User Wallet Address": wallet?.evmosAddressEthFormat,
          "Wallet Provider": wallet?.extensionName,
          // TODO: we should update this error. Show the correct message for the error
          "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        });
      }
    } else {
      try {
        useConvertProps.setDisabled(true);

        const hash = await withdraw(amount, wallet.evmosAddressEthFormat);

        dispatch(snackBroadcastSuccessful(hash, `${EXPLORER_URL}/tx/`));
        sendEvent(SUCCESSFUL_WRAP_TX, {
          "User Wallet Address": wallet?.evmosAddressEthFormat,
          "Wallet Provider": wallet?.extensionName,
        });
      } catch (e) {
        Log().error(e);
        dispatch(snackErrorGeneratingTx());
        sendEvent(UNSUCCESSFUL_WRAP_TX, {
          "User Wallet Address": wallet?.evmosAddressEthFormat,
          "Wallet Provider": wallet?.extensionName,
          // TODO: we should update this error. Show the correct message for the error
          "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        });
      }
    }
    useConvertProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
