import { useCallback, useMemo } from "react";
import { formatAttoNumber } from "../../../internal/asset/style/format";
import { indexOfMax } from "../../../internal/common/helpers/style";
import { BIG_ZERO } from "../../../internal/common/math/Bignumbers";
import {
  lookupProposalEndStatus,
  ProposalDetailProps,
  PROPOSAL_DISPLAY_MAPPING,
} from "../../../internal/governance/functionality/types";
import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import Arc from "../../common/arc/Arc";
import CheckIcon from "../../common/images/icons/CheckIcon";
import CloseIcon from "../../common/images/icons/CloseIcon";
import { BAR_COLORS } from "../bar/styles";
import VotingDetails from "../common/VotingDetails";
import VoteButton from "./vote/VoteButton";
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
    if (data.total.eq(BIG_ZERO)) {
      return null;
    }
    // 1 indicates that the majority of the votes were NO
    // 3 indicates that the majority of the votes were NO with veto
    if (largestWinningBlock === 1 || largestWinningBlock === 3) {
      return (
        <div
          className={`py-1 px-2 font-bold inset-0 text-pearl absolute flex flex-col items-center justify-center max-w-[50%] m-auto text-center h-1/2 w-1/2 rounded-[50%]
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
          className={`py-1 px-2 font-bold inset-0 text-pearl absolute flex flex-col items-center justify-center max-w-[50%] m-auto text-center h-1/2 w-1/2 rounded-[50%]
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
    <section className="space-y-5 mx-5 lg:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] h-fit">
      {isNotInDepositPeriod && (
        <div className="text-pearl fonst-bold flex justify-between">
          <p>Total</p>
          <p>
            {formatAttoNumber(data.total)} {EVMOS_SYMBOL}
          </p>
        </div>
      )}
      {/* graphic */}
      <div className="relative">
        {drawContentCircle()}

        {!data.total.eq(BIG_ZERO) && (
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
