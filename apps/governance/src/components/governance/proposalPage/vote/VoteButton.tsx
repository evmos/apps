import { useCallback, useState } from "react";
import { EVMOS_SYMBOL } from "evmos-wallet";
import { ConfirmButton } from "confirm-button";
import { Modal } from "modal";
import { useVote } from "../../modals/hooks/useVote";
import IdContainer from "../../common/IdContainer";

import { VoteProps } from "../../common/types";
import RadioElementContainer from "./RadioElementContainer";
import { useSelector } from "react-redux";
import { StoreType, MODAL_NOTIFICATIONS } from "evmos-wallet";
import { useEvmosBalance } from "../../../../internal/common/functionality/hooks/useEvmosBalance";
import { ErrorMessage } from "error-message";
import {
  convertFromAtto,
  feeVote,
  getReservedForFeeText,
} from "../../../../internal/common/helpers/style";

const VoteButton = ({ voteProps }: { voteProps: VoteProps }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const { evmosBalance } = useEvmosBalance();
  const useVoteProps = {
    id: voteProps.id,
    isVotingTimeWithinRange: voteProps.isVotingTimeWithinRange,
    option: selected,
    setShow,
    wallet,
  };

  const close = useCallback(() => setShow(false), []);
  const open = useCallback(() => setShow(true), []);
  const { handleConfirmButton } = useVote(useVoteProps);

  const isSmallBalance = Number(convertFromAtto(evmosBalance)) < 0.0001;

  return (
    <>
      <ConfirmButton
        text="Vote"
        onClick={open}
        disabled={!wallet.active || !voteProps.isVotingTimeWithinRange}
      />
      <Modal show={show} onClose={close}>
        <div className="space-y-4">
          <p className="font-bold">Your Vote</p>
          <div className="flex items-center space-x-2">
            <IdContainer id={voteProps.id} />
            <p className="text-sm font-bold text-darkGray2 opacity-80">
              {voteProps.title}
            </p>
          </div>
          <RadioElementContainer
            selected={selected}
            setSelected={setSelected}
          />

          <p>{getReservedForFeeText(feeVote, EVMOS_SYMBOL, EVMOS_SYMBOL)}</p>
          {isSmallBalance && (
            <ErrorMessage
              text={MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext}
            />
          )}

          <ConfirmButton
            text="Vote"
            onClick={handleConfirmButton}
            disabled={
              !wallet.active ||
              !voteProps.isVotingTimeWithinRange ||
              isSmallBalance
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default VoteButton;
