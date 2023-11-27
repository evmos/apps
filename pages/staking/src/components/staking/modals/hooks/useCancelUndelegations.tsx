// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { CancelUndelegationsProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import {
  GENERATING_TX_NOTIFICATIONS,
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
} from "@evmosapps/evmos-wallet";
import {
  CLICK_CONFIRM_CANCEL_UNDELEGATION_BUTTON,
  useTracker,
  SUCCESSFUL_TX_CANCEL_UNDELEGATION,
  UNSUCCESSFUL_TX_CANCEL_UNDELEGATION,
} from "tracker";

import { EXPLORER_URL } from "constants-helper";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { useStakingPrecompile } from "../../../../utils/hooks/useStakingPrecompile";

const evmos = getEvmosChainInfo();

export const useCancelUndelegations = (
  useCancelUndelegationProps: CancelUndelegationsProps
) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(
    CLICK_CONFIRM_CANCEL_UNDELEGATION_BUTTON
  );
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_CANCEL_UNDELEGATION
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_CANCEL_UNDELEGATION
  );

  const { cancelUnbondingDelegation } = useStakingPrecompile();

  //   async
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
      wallet: useCancelUndelegationProps?.wallet?.evmosAddressEthFormat,
      provider: useCancelUndelegationProps?.wallet?.extensionName,
    });
    useCancelUndelegationProps.setConfirmClicked(true);
    if (
      useCancelUndelegationProps.value === undefined ||
      useCancelUndelegationProps.value === null ||
      useCancelUndelegationProps.value === "" ||
      Number(useCancelUndelegationProps.value) === 0
    ) {
      return;
    }
    const amount = parseUnits(
      useCancelUndelegationProps.value,
      BigNumber.from(18)
    );

    if (amount.gt(BigNumber.from(useCancelUndelegationProps.item.balance))) {
      return;
    }

    useCancelUndelegationProps.setDisabled(true);
    try {
      const res = await cancelUnbondingDelegation(
        useCancelUndelegationProps.wallet.evmosAddressEthFormat,
        useCancelUndelegationProps.item.validatorAddress,
        amount,
        useCancelUndelegationProps.item.creationHeight
      );

      dispatch(snackBroadcastSuccessful(res.hash, `${EXPLORER_URL}/tx`));

      successfulTx({
        txHash: res.hash,
        wallet: useCancelUndelegationProps.wallet?.evmosAddressEthFormat,
        provider: useCancelUndelegationProps.wallet?.extensionName,
        transaction: "successful",
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());
      unsuccessfulTx({
        errorMessage: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        wallet: useCancelUndelegationProps.wallet?.evmosAddressEthFormat,
        provider: useCancelUndelegationProps.wallet?.extensionName,
        transaction: "unsuccessful",
      });
    }
    useCancelUndelegationProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
