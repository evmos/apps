// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";

import { VoteProps } from "../types";
import { snackExecuteIBCTransfer } from "@evmosapps/evmos-wallet";
import {
  CLICK_CONFIRM_VOTE_BUTTON,
  SUCCESSFUL_TX_VOTE,
  UNSUCCESSFUL_TX_VOTE,
} from "tracker";
import { useTracker } from "tracker";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { E } from "helpers";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { optionVoteSelected } from "../../../../utils/types";
import { executeVote } from "../../../../utils/transactions/vote";

const evmos = getEvmosChainInfo();
export const useVote = (useVoteProps: VoteProps) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_CONFIRM_VOTE_BUTTON);
  const { handlePreClickAction: successfulTx } = useTracker(SUCCESSFUL_TX_VOTE);
  const { handlePreClickAction: unsuccessfulTx } =
    useTracker(UNSUCCESSFUL_TX_VOTE);
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

    const option = optionVoteSelected[useVoteProps.option] ?? 0;

    const res = await executeVote(useVoteProps.wallet, useVoteProps.id, option);
    dispatch(snackExecuteIBCTransfer(res));
    if (res.error === true) {
      unsuccessfulTx({
        errorMessage: res.message,
        wallet: useVoteProps.wallet?.evmosAddressEthFormat,
        provider: useVoteProps.wallet?.extensionName,
        transaction: "unsuccessful",
      });
    } else {
      successfulTx({
        txHash: res.txHash,
        wallet: useVoteProps.wallet?.evmosAddressEthFormat,
        provider: useVoteProps.wallet?.extensionName,
        transaction: "successful",
      });
    }
    useVoteProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};
