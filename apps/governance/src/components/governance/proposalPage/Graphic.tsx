// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useCallback, useMemo } from "react";
import { formatAttoNumber, indexOfMax } from "helpers";
import {
  lookupProposalEndStatus,
  ProposalDetailProps,
  PROPOSAL_DISPLAY_MAPPING,
} from "../../../internal/governance/functionality/types";
import { EVMOS_SYMBOL } from "evmos-wallet";
import Arc from "../../common/arc/Arc";
import { CloseIcon, CheckIcon } from "icons";
import { BAR_COLORS } from "../bar/styles";
import VotingDetails from "../common/VotingDetails";
import VoteButton from "./vote/VoteButton";
import { BigNumber } from "@ethersproject/bignumber";
const Graphic = ({
  data,
  loading,
  error,
  userVote,
}: {
  data: ProposalDetailProps;
  loading: boolean;
  error: unknown;
  userVote: null | JSX.Element;
}) => {
  const isNotInDepositPeriod =
    PROPOSAL_DISPLAY_MAPPING[data.status] !== "Deposit";
  const largestWinningBlock = useMemo(() => {
    return indexOfMax(data.tallyPercents);
  }, [data.tallyPercents]);

  const drawContentCircle = useCallback(() => {
    if (loading) {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>No results</div>;
    }
    if (data.isVotingTimeWithinRange && isNotInDepositPeriod) {
      return null;
    }

    // avoid showing circle with data if total is 0
    if (data.total.eq(BigNumber.from(0))) {
      return null;
    }
    // 1 indicates that the majority of the votes were NO
    // 3 indicates that the majority of the votes were NO with veto
    if (largestWinningBlock === 1 || largestWinningBlock === 3) {
      return (
        <div
          className={`absolute inset-0 m-auto flex h-1/2 w-1/2 max-w-[50%] flex-col items-center justify-center rounded-[50%] px-2 py-1 text-center font-bold text-pearl
    ${BAR_COLORS.no}
    `}
        >
          <CloseIcon width={30} height={30} />
          {lookupProposalEndStatus[largestWinningBlock]}
        </div>
      );
    } else {
      return (
        <div
          className={`absolute inset-0 m-auto flex h-1/2 w-1/2 max-w-[50%] flex-col items-center justify-center rounded-[50%] px-2 py-1 text-center font-bold text-pearl
      ${BAR_COLORS.yes}
      `}
        >
          <CheckIcon width={30} height={30} />
          {lookupProposalEndStatus[0]}
        </div>
      );
    }
  }, [
    error,
    loading,
    largestWinningBlock,
    data.isVotingTimeWithinRange,
    isNotInDepositPeriod,
    data.total,
  ]);
  return (
    <section className="mx-5 mb-5 h-fit space-y-5 rounded-2xl bg-darkGray2 p-5 font-[IBM] lg:mx-0">
      {isNotInDepositPeriod && (
        <div className="fonst-bold flex justify-between text-pearl">
          <p>Total</p>
          <p>
            {formatAttoNumber(data.total)} {EVMOS_SYMBOL}
          </p>
        </div>
      )}
      {/* graphic */}
      <div className="relative">
        {drawContentCircle()}

        {!data.total.eq(BigNumber.from(0)) && (
          <Arc
            range={360}
            items={[
              {
                color: "#97AD11",
                percentage: Number(data?.tallyPercents[0]),
              },
              {
                color: "#ed4e33",
                percentage: Number(data.tallyPercents[1]),
              },
              {
                color: "#918378",
                percentage: Number(data.tallyPercents[2]),
              },
              {
                color: "#edcd5b",
                percentage: Number(data.tallyPercents[3]),
              },
            ]}
          ></Arc>
        )}
      </div>
      <VotingDetails percents={data.tallyPercents} values={data.tallyResults} />
      {userVote !== null && userVote}
      <VoteButton
        voteProps={{
          id: data.id,
          title: data.title,
          isVotingTimeWithinRange: data.isVotingTimeWithinRange,
        }}
      />
    </section>
  );
};

export default Graphic;
