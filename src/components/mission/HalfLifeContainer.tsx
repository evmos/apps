import Link from "next/link";
import { useEpochDay } from "../../internal/common/api/hooks/useEpochDay";
import { useRemainingEpochs } from "../../internal/common/api/hooks/useRemainingEpochs";
import { Countdown } from "../common/Countdown";

const HalfLifeContainer = () => {
  const { epochs } = useEpochDay();
  const { remainingEpochs } = useRemainingEpochs();
  const miliSecondsPerDay = 86400000;

  return (
    <Link
      target="_blank"
      rel="noreferrer"
      href="https://medium.com/evmos/the-evmos-token-model-edc07014978b#:~:text=Evmos%20is%20highly,deemed%20too%20low"
      aria-label="half life"
    >
      <div className=" bg-darkGray2 flex text-2xl flex-col p-5 border border-pearl font-bold rounded-2xl font-[GreyCliff] text-pearl ">
        <span className="text-sm font-normal font-[IBM]">The Half Life</span>
        <Countdown epochs={remainingEpochs * miliSecondsPerDay + epochs} />
      </div>
    </Link>
  );
};

export default HalfLifeContainer;
