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
  SUCCESSFUL_TX_CANCEL_UNDELEGATION,
  UNSUCCESSFUL_TX_CANCEL_UNDELEGATION,
  sendEvent,
} from "tracker";

import { EXPLORER_URL } from "constants-helper";

import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { useStakingPrecompile } from "../../../../utils/hooks/useStakingPrecompile";
import { getChainId, switchChain } from "wagmi/actions";
import { useConfig } from "wagmi";

const evmos = getEvmosChainInfo();

export const useCancelUndelegations = (
  useCancelUndelegationProps: CancelUndelegationsProps,
) => {
  const dispatch = useDispatch();

  const { cancelUnbondingDelegation } = useStakingPrecompile();
  const config = useConfig();
  //   async
  const handleConfirmButton = async () => {
    if (getChainId(config) !== evmos.id) {
      const [err] = await E.try(() =>
        switchChain(config, {
          chainId: evmos.id,
        }),
      );
      if (err) return;
    }
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
      BigNumber.from(18),
    );

    if (amount.gt(BigNumber.from(useCancelUndelegationProps.item.balance))) {
      return;
    }

    useCancelUndelegationProps.setDisabled(true);
    try {
      const hash = await cancelUnbondingDelegation(
        useCancelUndelegationProps.wallet.evmosAddressEthFormat,
        useCancelUndelegationProps.item.validatorAddress,
        amount,
        useCancelUndelegationProps.item.creationHeight,
      );

      dispatch(snackBroadcastSuccessful(hash, `${EXPLORER_URL}/tx`));

      sendEvent(SUCCESSFUL_TX_CANCEL_UNDELEGATION, {
        "User Wallet Address":
          useCancelUndelegationProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useCancelUndelegationProps.wallet?.extensionName,
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());

      sendEvent(UNSUCCESSFUL_TX_CANCEL_UNDELEGATION, {
        "User Wallet Address":
          useCancelUndelegationProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useCancelUndelegationProps.wallet?.extensionName,
        // TODO: we should update this error. Show the correct message for the error
        "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      });
    }
    useCancelUndelegationProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
