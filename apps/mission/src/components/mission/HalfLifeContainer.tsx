// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { Countdown } from "ui-helpers";
import { useEpochDay } from "../../internal/functionality/hooks/useEpochDay";
import { useRemainingEpochs } from "../../internal/functionality/hooks/useRemainingEpochs";
import { ExternalLinkIcon } from "icons";
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
      <div className="flex items-center justify-between rounded-2xl border border-pearl bg-darkGray2 p-5 font-[GreyCliff] text-2xl font-bold text-pearl">
        <div className=" flex flex-col  ">
          <span className="font-[IBM] text-sm font-normal">The Half Life</span>
          <Countdown epochs={remainingEpochs * miliSecondsPerDay + epochs} />
        </div>
        <ExternalLinkIcon width={18} height={18} />
      </div>
    </Link>
  );
};

export default HalfLifeContainer;
