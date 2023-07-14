import { Badge } from "ui-helpers";
import { useFireworks } from "./useFireworks";
import {
  handleInteractWithdApp,
  handleLearnMore,
  handleStakeWithEvmos,
  renderFireworksPortal,
} from "./helpers";
import { Button } from "./button/Button";
import { TitleButton } from "./button/TitleButton";
import { Dispatch, SetStateAction } from "react";

export const NextSteps = ({
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const { fireworksRef, portalContainer } = useFireworks();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      {renderFireworksPortal(fireworksRef, portalContainer)}
      <p className="mb-4 flex h-48 w-48 items-center justify-center rounded-full border border-[#FAF8F8] bg-[#FAF8F8] text-9xl">
        <span role="img" aria-label="Celebration icon">
          🎉
        </span>
      </p>
      <h1 className="font-bold">Congratulations!</h1>
      <p className="text-xs">
        You did it! You&apos;ve successfully created an account on Evmos. Get
        started with any of the options below!
      </p>
      <div className="flex w-full items-center justify-between">
        <Button
          handleClick={() => {
            handleInteractWithdApp(setShow);
          }}
        >
          <TitleButton text="Interact with a dApp" />
          <Badge text="Recommended" />
        </Button>

        <Button
          handleClick={() => {
            handleStakeWithEvmos(setShow);
          }}
        >
          <TitleButton text="Stake your Evmos" />

          <Badge
            text="Advanced"
            style="ring-[#F4E5BA] bg-[#FEFCE8] text-[#854D0E]"
          />
        </Button>
      </div>
      <button
        className="w-full cursor-pointer rounded-lg border border-[#D1D5DB] py-3"
        onClick={() => {
          handleLearnMore(setShow);
        }}
      >
        <TitleButton text=" Learn More" />
      </button>
    </div>
  );
};
