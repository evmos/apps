import { useDispatch } from "react-redux";
import { executeVote } from "../../../../internal/governance/functionality/transactions/vote";
import { optionVoteSelected } from "../../../../internal/governance/functionality/types";
import { VoteProps } from "../types";
import { snackExecuteIBCTransfer } from "evmos-wallet";

export const useVote = (useVoteProps: VoteProps) => {
  const dispatch = useDispatch();
  const handleConfirmButton = async () => {
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
    useVoteProps.setShow(false);
  };

  return { handleConfirmButton };
};
