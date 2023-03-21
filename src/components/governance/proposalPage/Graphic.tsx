import { useCallback, useMemo } from "react";
import { formatAttoNumber } from "../../../internal/asset/style/format";
import { indexOfMax } from "../../../internal/common/helpers/style";
import {
  lookupProposalEndStatus,
  ProposalDetailProps,
} from "../../../internal/governance/functionality/types";
import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import Arc from "../../common/arc/Arc";
import CheckIcon from "../../common/images/icons/CheckIcon";
import CloseIcon from "../../common/images/icons/CloseIcon";
import { BAR_COLORS } from "../bar/styles";
import VotingDetails from "../common/VotingDetails";
const Graphic = ({
  data,
  loading,
  error,
}: {
  data: ProposalDetailProps;
  loading: boolean;
  error: unknown;
}) => {
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
    if (largestWinningBlock === 0) {
      return (
        <>
          <CheckIcon width={30} height={30} />
          {lookupProposalEndStatus[largestWinningBlock]}
        </>
      );
    } else {
      return (
        <>
          <CloseIcon width={30} height={30} />
          {lookupProposalEndStatus[largestWinningBlock]}
        </>
      );
    }
  }, [error, loading, largestWinningBlock]);
  return (
    <section className="space-y-5 mx-5 lg:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM]">
      <div className="text-pearl font-bold flex justify-between">
        <p>Total</p>
        <p>
          {formatAttoNumber(data.total)} {EVMOS_SYMBOL}
        </p>
      </div>
      <div className="relative">
        <div
          className={`py-1 px-2 font-bold inset-0 text-white absolute flex flex-col items-center justify-center max-w-[50%] m-auto text-center h-1/2 w-1/2 rounded-[50%]
    ${largestWinningBlock === 0 ? BAR_COLORS.yes : BAR_COLORS.no}
    `}
        >
          {drawContentCircle()}
        </div>

        <Arc
          range={360}
          items={[
            {
              color: "#97AD11",
              percentage: Number(data.tallyPercents[0]),
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
      </div>
      <VotingDetails percents={data.tallyPercents} values={data.tallyResults} />
    </section>
  );
};

export default Graphic;
