import { useRouter } from "next/router";
import { useMemo } from "react";
import { formatAttoNumber } from "../../../internal/asset/style/format";
import { indexOfMax } from "../../../internal/common/helpers/style";
import { useProposals } from "../../../internal/governance/functionality/hooks/useProposal";
import { lookupProposalEndStatus } from "../../../internal/governance/functionality/types";
import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import Arc from "../../common/arc/Arc";
import CheckIcon from "../../common/images/icons/CheckIcon";
import CloseIcon from "../../common/images/icons/CloseIcon";
import { BAR_COLORS } from "../bar/styles";
import VotingDetails from "../common/VotingDetails";

const Content = () => {
  const router = useRouter();

  const { pid } = router.query;
  const { proposalDetail } = useProposals(pid as string);

  const largestWinningBlock = useMemo(() => {
    return indexOfMax(proposalDetail.tallyPercents);
  }, [proposalDetail.tallyPercents]);
  return (
    // graphic
    // width / height has to match with the one in the arc, se the circle in the middle
    // is always aligned correctly
    <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-4">
      <section className="col-span-3">test</section>
      <section
        className="space-y-5
    mx-5 lg:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] "
      >
        <div className="text-pearl font-bold flex justify-between">
          <p>Total</p>
          <p>
            {formatAttoNumber(proposalDetail.total)} {EVMOS_SYMBOL}
          </p>
        </div>
        <div className=" relative">
          <div
            className={`py-1 px-2 font-bold inset-0 text-white absolute flex flex-col items-center justify-center max-w-[50%] m-auto text-center h-1/2 w-1/2 rounded-[50%]
        ${largestWinningBlock === 0 ? BAR_COLORS.yes : BAR_COLORS.no}
        `}
          >
            {largestWinningBlock === 0 ? (
              <CheckIcon width={30} height={30} />
            ) : (
              <CloseIcon width={30} height={30} />
            )}
            {lookupProposalEndStatus[largestWinningBlock]}
          </div>

          <Arc
            range={360}
            // TODO: check size for arc
            // size={200}
            items={[
              {
                color: "#97AD11",
                percentage: Number(proposalDetail.tallyPercents[0]),
              },
              {
                color: "#ed4e33",
                percentage: Number(proposalDetail.tallyPercents[1]),
              },
              {
                color: "#918378",
                percentage: Number(proposalDetail.tallyPercents[2]),
              },
              // TODO: no with veto is not being displayed
              // I'm already sending the calculated percent and it's 0
              // maybe I should send the values and calculate it with the numbers
              // no with the percents
              {
                color: "#edcd5b",
                percentage: Number(proposalDetail.tallyPercents[3]),
              },
            ]}
          ></Arc>
        </div>
        <VotingDetails
          percents={proposalDetail.tallyPercents}
          values={proposalDetail.tallyResults}
        />
      </section>
    </div>
  );
};

export default Content;
