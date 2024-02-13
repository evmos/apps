// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useState } from "react";
import { EVMOS_SYMBOL, getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { ErrorMessage, ConfirmButton, Modal } from "@evmosapps/ui-helpers";
import IdContainer from "../../common/IdContainer";

import { MODAL_NOTIFICATIONS } from "@evmosapps/evmos-wallet";
import { getReservedForFeeText, raise } from "helpers";
import { FEE_VOTE } from "constants-helper";
import { BigNumber } from "@ethersproject/bignumber";
import {
  CLICK_VOTE_BUTTON,
  SUCCESSFUL_TX_VOTE,
  UNSUCCESSFUL_TX_VOTE,
  sendEvent,
} from "tracker";
import { useProposalById } from "../../../../utils/hooks/useProposals";
import { useAccount } from "wagmi";

import { useTrpcQuery } from "@evmosapps/trpc/client";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { useSignTypedDataMessage } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-sign-typed-message";
import { MsgVote } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/tx_pb";
import { safeBigInt } from "helpers/src/bigint/safe-bigint";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { VoteOption } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/gov_pb";
import RadioElement from "../../../common/radioGroups/RadioElement";

const VOTE_OPTION_LABEL: {
  [key in VoteOption]?: string;
} = {
  [VoteOption.YES]: "Yes",
  [VoteOption.ABSTAIN]: "Abstain",
  [VoteOption.NO]: "No",
  [VoteOption.NO_WITH_VETO]: "No with Veto",
};
const GAS = 3000000n;

const VoteButton = ({ proposalId }: { proposalId: string }) => {
  const { data } = useProposalById(proposalId);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(VoteOption.YES);
  const { address } = useAccount();
  const chainRef = useEvmosChainRef();
  const { data: balance } = useTrpcQuery((t) =>
    t.account.balance.byDenom({
      denom: "EVMOS",
      address: address ?? raise("no address"),
      chainRef,
    }),
  );
  const isVotingTimeWithinRange = data.votingEnd.getTime() > Date.now();
  const { mutate, error, isSuccess } = useSignTypedDataMessage();

  useEffect(() => {
    if (!isSuccess) return;
    setIsOpen(false);

    sendEvent(SUCCESSFUL_TX_VOTE, {
      "User Wallet Address": address,
      "Wallet Provider": getActiveProviderKey(),
      "Governance Proposal": proposalId,
    });
  }, [address, isSuccess, proposalId]);

  useEffect(() => {
    if (!error) return;
    sendEvent(UNSUCCESSFUL_TX_VOTE, {
      "User Wallet Address": address,
      "Wallet Provider": getActiveProviderKey(),
      "Governance Proposal": proposalId,
      "Error Message": error.message,
    });
  }, [address, error, proposalId]);

  const vote = () => {
    mutate({
      messages: [
        new MsgVote({
          proposalId: safeBigInt(proposalId),
          voter: normalizeToCosmos(address ?? raise("no address")),
          option: selected,
        }),
      ],
      gasLimit: GAS,
    });
  };
  const isSmallBalance = (balance?.balance.erc20 ?? 0n) < GAS;
  return (
    <>
      <ConfirmButton
        text="Vote"
        onClick={() => {
          setIsOpen(true);
          sendEvent(CLICK_VOTE_BUTTON, {
            "User Wallet Address": address,
            "Wallet Provider": getActiveProviderKey(),
          });
        }}
        disabled={!address || !isVotingTimeWithinRange}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Body>
          <div className="space-y-4">
            <p className="font-bold">Your Vote</p>
            <div className="flex items-center space-x-2">
              <IdContainer id={proposalId} />
              <p className="text-sm font-bold text-darkGray2 opacity-80">
                {data.title}
              </p>
            </div>
            <div>
              {[
                VoteOption.YES,
                VoteOption.ABSTAIN,
                VoteOption.NO,
                VoteOption.NO_WITH_VETO,
              ].map((option) => (
                <RadioElement
                  key={option}
                  text={VOTE_OPTION_LABEL[option] ?? raise("no label")}
                  selected={VOTE_OPTION_LABEL[selected] ?? raise("no label")}
                  onChange={() => {
                    setSelected(option);
                  }}
                  name="votes"
                />
              ))}
            </div>

            <p>
              {getReservedForFeeText(
                BigNumber.from(FEE_VOTE),
                EVMOS_SYMBOL,
                EVMOS_SYMBOL,
              )}
            </p>
            {isSmallBalance && (
              <ErrorMessage>
                {MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext}
              </ErrorMessage>
            )}

            <ConfirmButton
              text="Vote"
              onClick={() => vote()}
              disabled={!address || !isVotingTimeWithinRange || isSmallBalance}
            />
            {error && <ErrorMessage>{"Failed to vote"}</ErrorMessage>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VoteButton;
