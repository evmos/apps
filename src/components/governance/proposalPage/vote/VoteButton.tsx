import { useCallback, useState } from "react";
import { feeVote } from "../../../../internal/asset/Helpers";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import ConfirmButton from "../../../common/ConfirmButton";
import Modal from "../../../common/Modal";
import { useVote } from "../../modals/hooks/useVote";
import IdContainer from "../../common/IdContainer";

import { VoteProps } from "../../common/types";
import RadioElementContainer from "./RadioElementContainer";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../redux/Store";

const VoteButton = ({ voteProps }: { voteProps: VoteProps }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const useVoteProps = {
    id: voteProps.id,
    option: selected,
    setShow,
    wallet,
  };

  const close = useCallback(() => setShow(false), []);
  const open = useCallback(() => setShow(true), []);
  const { handleConfirmButton } = useVote(useVoteProps);
  return (
    <>
      <ConfirmButton text="Vote" onClick={open} disabled={false} />
      <Modal show={show} onClose={close}>
        <div className="space-y-4">
          <p className="font-bold">Your Vote</p>
          <div className="flex items-center space-x-2">
            <IdContainer id={voteProps.id} />
            <p className="text-sm text-darkGray2 opacity-80 font-bold">
              {voteProps.title}
            </p>
          </div>
          <RadioElementContainer
            selected={selected}
            setSelected={setSelected}
          />

          {/* TODO: check if fee is correct */}
          <p>{getReservedForFeeText(feeVote, EVMOS_SYMBOL, EVMOS_SYMBOL)}</p>
          <ConfirmButton
            text="Vote"
            onClick={handleConfirmButton}
            disabled={false}
          />
        </div>
      </Modal>
    </>
  );
};

export default VoteButton;
