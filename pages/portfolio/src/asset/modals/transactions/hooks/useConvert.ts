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
import {
  useTracker,
  CLICK_BUTTON_CONFIRM_WRAP_TX,
  SUCCESSFUL_WRAP_TX,
  UNSUCCESSFUL_WRAP_TX,
} from "tracker";

import { useWEVMOS } from "../contracts/hooks/useWEVMOS";
import { parseUnits } from "@ethersproject/units";
import { Log } from "helpers";
import { EXPLORER_URL } from "constants-helper";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { GENERATING_TX_NOTIFICATIONS } from "../../../../utils/transactions/errors";

const evmos = getEvmosChainInfo();

const wrapEvmos = "EVMOS <> WEVMOS";
const unwrapEvmos = "WEVMOS <> EVMOS";
export const useConvert = (useConvertProps: ConvertProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  const { deposit, withdraw } = useWEVMOS();

  const { handlePreClickAction: clickConfirmWrapTx } = useTracker(
    CLICK_BUTTON_CONFIRM_WRAP_TX
  );

  const { handlePreClickAction: successfulTx } = useTracker(SUCCESSFUL_WRAP_TX);

  const { handlePreClickAction: unsuccessfulTx } =
    useTracker(UNSUCCESSFUL_WRAP_TX);

  const handleConfirmButton = async () => {
    const connectedNetwork = getNetwork();
    if (connectedNetwork.chain?.id !== evmos.id) {
      const [err] = await E.try(() =>
        switchNetwork({
          chainId: evmos.id,
        })
      );
      if (err) return;
    }
    clickConfirmWrapTx({
      convert: useConvertProps.balance.isIBCBalance ? wrapEvmos : unwrapEvmos,
      wallet: wallet?.evmosAddressEthFormat,
      provider: wallet?.extensionName,
    });

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
      BigNumber.from(useConvertProps.item.decimals)
    );
    if (amount.gt(useConvertProps.balance.balanceFrom)) {
      return;
    }
    if (useConvertProps.balance.isIBCBalance) {
      try {
        useConvertProps.setDisabled(true);

        const res = await deposit(amount, wallet.evmosAddressEthFormat);

        dispatch(snackBroadcastSuccessful(res.hash, `${EXPLORER_URL}/tx/`));
        successfulTx({
          txHash: res.hash,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "successful",
          convert: wrapEvmos,
        });
      } catch (e) {
        Log().error(e);
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

        const res = await withdraw(amount, wallet.evmosAddressEthFormat);

        dispatch(snackBroadcastSuccessful(res.hash, `${EXPLORER_URL}/tx/`));
        successfulTx({
          txHash: res.hash,
          wallet: wallet?.evmosAddressEthFormat,
          provider: wallet?.extensionName,
          transaction: "successful",
          convert: unwrapEvmos,
        });
      } catch (e) {
        Log().error(e);
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
    useConvertProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
