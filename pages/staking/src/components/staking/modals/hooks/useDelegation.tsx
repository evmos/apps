// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useDispatch } from "react-redux";
import {
  GENERATING_TX_NOTIFICATIONS,
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
} from "@evmosapps/evmos-wallet";
import { DelegateProps } from "../types";
import {
  CLICK_BUTTON_CONFIRM_DELEGATE,
  useTracker,
  SUCCESSFUL_TX_DELEGATE,
  UNSUCCESSFUL_TX_DELEGATE,
} from "tracker";

import { EXPLORER_URL } from "constants-helper";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { useStakingPrecompile } from "../../../../utils/hooks/useStakingPrecompile";

const evmos = getEvmosChainInfo();

export const useDelegation = (useDelegateProps: DelegateProps) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_BUTTON_CONFIRM_DELEGATE);
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_DELEGATE
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_DELEGATE
  );

  const { delegate } = useStakingPrecompile();

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

    handlePreClickAction({
      wallet: useDelegateProps?.wallet?.evmosAddressEthFormat,
      provider: useDelegateProps?.wallet?.extensionName,
    });
    useDelegateProps.setConfirmClicked(true);
    if (
      useDelegateProps.value === undefined ||
      useDelegateProps.value === null ||
      useDelegateProps.value === "" ||
      Number(useDelegateProps.value) === 0
    ) {
      return;
    }
    const amount = parseUnits(useDelegateProps.value, BigNumber.from(18));

    if (
      useDelegateProps.evmosBalance.eq(BigNumber.from(-1)) ||
      amount.gt(useDelegateProps.evmosBalance)
    ) {
      return;
    }

    useDelegateProps.setDisabled(true);

    try {
      const res = await delegate(
        useDelegateProps.wallet.evmosAddressEthFormat,
        useDelegateProps.item.validatorAddress,
        amount
      );

      dispatch(snackBroadcastSuccessful(res.hash, `${EXPLORER_URL}/tx`));

      successfulTx({
        txHash: res.hash,
        wallet: useDelegateProps.wallet?.evmosAddressEthFormat,
        provider: useDelegateProps.wallet?.extensionName,
        transaction: "successful",
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());
      unsuccessfulTx({
        errorMessage: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        wallet: useDelegateProps.wallet?.evmosAddressEthFormat,
        provider: useDelegateProps.wallet?.extensionName,
        transaction: "unsuccessful",
      });
    }

    useDelegateProps.setIsOpen(false);
  };
  return { handleConfirmButton };
};
