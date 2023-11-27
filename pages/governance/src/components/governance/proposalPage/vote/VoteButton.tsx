// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { EVMOS_SYMBOL } from "@evmosapps/evmos-wallet";
import { ErrorMessage, ConfirmButton, Modal } from "@evmosapps/ui-helpers";
import { useVote } from "../../modals/hooks/useVote";
import IdContainer from "../../common/IdContainer";
import { VoteProps } from "../../common/types";
import RadioElementContainer from "./RadioElementContainer";
import { useSelector } from "react-redux";
import { StoreType, MODAL_NOTIFICATIONS } from "@evmosapps/evmos-wallet";
import { convertFromAtto, getReservedForFeeText } from "helpers";
import { FEE_VOTE } from "constants-helper";
import { BigNumber } from "@ethersproject/bignumber";
import { CLICK_VOTE_BUTTON, useTracker } from "tracker";
import { useEvmosBalance } from "./useEvmosBalance";
const VoteButton = ({ voteProps }: { voteProps: VoteProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const { evmosBalance } = useEvmosBalance();
  const useVoteProps = {
    id: voteProps.id,
    isVotingTimeWithinRange: voteProps.isVotingTimeWithinRange,
    option: selected,
    setIsOpen,
    wallet,
  };

  const { handleConfirmButton } = useVote(useVoteProps);
  const { handlePreClickAction } = useTracker(CLICK_VOTE_BUTTON);
  const isSmallBalance = Number(convertFromAtto(evmosBalance)) < 0.0001;
  return (
    <>
      <ConfirmButton
        text="Vote"
        onClick={() => {
          setIsOpen(true);
          handlePreClickAction({
            wallet: wallet?.evmosAddressEthFormat,
            provider: wallet?.extensionName,
          });
        }}
        disabled={!wallet.active || !voteProps.isVotingTimeWithinRange}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Body>
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

            <p>
              {getReservedForFeeText(
                BigNumber.from(FEE_VOTE),
                EVMOS_SYMBOL,
                EVMOS_SYMBOL
              )}
            </p>
            {isSmallBalance && (
              <ErrorMessage>
                {MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext}
              </ErrorMessage>
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VoteButton;
