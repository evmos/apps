// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { ConvertProps } from "../types";
import { BigNumber } from "@ethersproject/bignumber";
import {
  getActiveProviderKey,
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
  snackRequestRejected,
} from "@evmosapps/evmos-wallet";
import { SUCCESSFUL_WRAP_TX, UNSUCCESSFUL_WRAP_TX, sendEvent } from "tracker";
import { useWEVMOS } from "../contracts/hooks/useWEVMOS";
import { parseUnits } from "@ethersproject/units";
import { Log } from "helpers";
import { EXPLORER_URL } from "@evmosapps/constants";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { GENERATING_TX_NOTIFICATIONS } from "../../../../utils/transactions/errors";
import { useAccount, useConfig } from "wagmi";
import { getChainId, switchChain } from "wagmi/actions";

const evmos = getEvmosChainInfo();

export const useConvert = (useConvertProps: ConvertProps) => {
  const { address } = useAccount();
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
    if (!address) {
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
    const providerKey = getActiveProviderKey();
    if (amount.gt(useConvertProps.balance.balanceFrom)) {
      return;
    }
    if (useConvertProps.balance.isIBCBalance) {
      try {
        useConvertProps.setDisabled(true);

        const hash = await deposit(amount, address);

        dispatch(snackBroadcastSuccessful(hash, `${EXPLORER_URL}/tx`));
        sendEvent(SUCCESSFUL_WRAP_TX, {
          "User Wallet Address": address,
          "Wallet Provider": providerKey,
        });
      } catch (e) {
        Log().error(e);
        dispatch(snackErrorGeneratingTx());
        sendEvent(UNSUCCESSFUL_WRAP_TX, {
          "User Wallet Address": address,
          "Wallet Provider": providerKey,
          // TODO: we should update this error. Show the correct message for the error
          "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        });
      }
    } else {
      try {
        useConvertProps.setDisabled(true);

        const hash = await withdraw(amount, address);

        dispatch(snackBroadcastSuccessful(hash, `${EXPLORER_URL}/tx`));
        sendEvent(SUCCESSFUL_WRAP_TX, {
          "User Wallet Address": address,
          "Wallet Provider": providerKey,
        });
      } catch (e) {
        Log().error(e);
        dispatch(snackErrorGeneratingTx());
        sendEvent(UNSUCCESSFUL_WRAP_TX, {
          "User Wallet Address": address,
          "Wallet Provider": providerKey,
          // TODO: we should update this error. Show the correct message for the error
          "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        });
      }
    }
    useConvertProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
