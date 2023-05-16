// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { executeVote } from "../../../../internal/governance/functionality/transactions/vote";
import { optionVoteSelected } from "../../../../internal/governance/functionality/types";
import { VoteProps } from "../types";
import { snackExecuteIBCTransfer } from "evmos-wallet";
import {
  CLICK_CONFIRM_VOTE_BUTTON,
  SUCCESSFUL_TX_VOTE,
  UNSUCCESSFUL_TX_VOTE,
} from "tracker";
import { useTracker } from "tracker";

export const useVote = (useVoteProps: VoteProps) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_CONFIRM_VOTE_BUTTON);
  const { handlePreClickAction: successfulTx } = useTracker(SUCCESSFUL_TX_VOTE);
  const { handlePreClickAction: unsuccessfulTx } =
    useTracker(UNSUCCESSFUL_TX_VOTE);
  const handleConfirmButton = async () => {
    handlePreClickAction({
      wallet: useVoteProps?.wallet?.evmosAddressEthFormat,
      provider: useVoteProps?.wallet?.extensionName,
    });
    if (
      useVoteProps.option === undefined ||
      useVoteProps.option === null ||
      useVoteProps.id === undefined ||
      useVoteProps.id === null
    ) {
      return;
    }

    let option = 0;
    if (useVoteProps.option in optionVoteSelected) {
      option = optionVoteSelected[useVoteProps.option];
    }

    const res = await executeVote(useVoteProps.wallet, useVoteProps.id, option);
    dispatch(snackExecuteIBCTransfer(res));
    if (res.error === true) {
      unsuccessfulTx({
        errorMessage: res.message,
        wallet: useVoteProps.wallet?.evmosAddressEthFormat,
        provider: useVoteProps.wallet?.extensionName,
      });
    } else {
      successfulTx({
        txHash: res.txHash,
        wallet: useVoteProps.wallet?.evmosAddressEthFormat,
        provider: useVoteProps.wallet?.extensionName,
      });
    }
    useVoteProps.setShow(false);
  };

  return { handleConfirmButton };
};
