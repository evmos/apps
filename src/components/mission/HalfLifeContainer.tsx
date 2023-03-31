import { useEpochDay } from "../../internal/common/api/hooks/useEpochDay";
import { useRemainingEpochs } from "../../internal/common/api/hooks/useRemainingEpochs";
import { Countdown } from "../common/Countdown";

const HalfLifeContainer = () => {
  const { epochs } = useEpochDay();
  const { remainingEpochs } = useRemainingEpochs();
  const miliSecondsPerDay = 86400000;

  return (
    <>
      <div className=" bg-darkGray2 flex text-2xl flex-col p-5 border border-pearl font-bold rounded-2xl font-[GreyCliff] text-pearl ">
        <span className="text-sm font-normal font-[IBM]">The Half Life</span>
        <Countdown epochs={remainingEpochs * miliSecondsPerDay + epochs} />
      </div>
    </>
  );
};

export default HalfLifeContainer;
