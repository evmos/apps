// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { RedelegateProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import {
  GENERATING_TX_NOTIFICATIONS,
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
} from "@evmosapps/evmos-wallet";
import {
  CLICK_BUTTON_CONFIRM_REDELEGATE,
  useTracker,
  SUCCESSFUL_TX_REDELEGATE,
  UNSUCCESSFUL_TX_REDELEGATE,
} from "tracker";

import { EXPLORER_URL } from "constants-helper";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { E } from "helpers";
import { useStakingPrecompile } from "../../../../utils/hooks/useStakingPrecompile";

const evmos = getEvmosChainInfo();

export const useRedelegation = (useRedelegateProps: RedelegateProps) => {
  const dispatch = useDispatch();

  const { handlePreClickAction } = useTracker(CLICK_BUTTON_CONFIRM_REDELEGATE);
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_REDELEGATE
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_REDELEGATE
  );

  const { redelegate } = useStakingPrecompile();

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
      wallet: useRedelegateProps?.wallet?.evmosAddressEthFormat,
      provider: useRedelegateProps?.wallet?.extensionName,
    });
    useRedelegateProps.setConfirmClicked(true);
    if (
      useRedelegateProps.value === undefined ||
      useRedelegateProps.value === null ||
      useRedelegateProps.value === "" ||
      Number(useRedelegateProps.value) === 0 ||
      useRedelegateProps.validatorDst === undefined ||
      useRedelegateProps.validatorDst === null ||
      useRedelegateProps.validatorDst === ""
    ) {
      return;
    }
    const amount = parseUnits(useRedelegateProps.value, BigNumber.from(18));

    if (amount.gt(useRedelegateProps.item.balance)) {
      return;
    }

    useRedelegateProps.setDisabled(true);
    try {
      const res = await redelegate(
        useRedelegateProps.wallet.evmosAddressEthFormat,
        useRedelegateProps.item.validatorAddress,
        useRedelegateProps.validatorDst,
        amount
      );

      dispatch(snackBroadcastSuccessful(res.hash, `${EXPLORER_URL}/tx`));

      successfulTx({
        txHash: res.hash,
        wallet: useRedelegateProps.wallet?.evmosAddressEthFormat,
        provider: useRedelegateProps.wallet?.extensionName,
        transaction: "successful",
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());
      unsuccessfulTx({
        errorMessage: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        wallet: useRedelegateProps.wallet?.evmosAddressEthFormat,
        provider: useRedelegateProps.wallet?.extensionName,
        transaction: "unsuccessful",
      });
    }
    useRedelegateProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
