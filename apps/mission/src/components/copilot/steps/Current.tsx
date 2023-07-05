import { useDispatch } from "react-redux";
import { store, disconnectWallets, Metamask } from "evmos-wallet";
import { ConfirmButton } from "ui-helpers";
import { Dispatch, SetStateAction } from "react";
export const Current = ({
  step,
  stepName,
  setStepName,
}: {
  step: {
    href: string;
    name: string;
    loading: string;
    done: string;
  };
  stepName: string;
  setStepName: Dispatch<SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();

  return (
    <a
      target="_blank"
      //   href={stepUrl}
      className="group relative flex items-center"
      aria-current="step"
    >
      <span className="flex h-9 items-center" aria-hidden="true">
        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-red bg-white"></span>
      </span>

      <ConfirmButton
        text={stepName}
        className="ml-4 w-full rounded-lg font-normal normal-case tracking-wider"
        onClick={async () => {
          disconnectWallets(dispatch);
          const metamask = new Metamask(store);
          const resultConnect = await metamask.connect();
          console.log(resultConnect);
          if (resultConnect.result) {
            setStepName(step.done);
            // setStepStatus("complete");
          }
          if (
            // TODO: remove the hardcoded message
            resultConnect.message ===
            "The MetaMask extension could not be found. Try using Copilot to get started!"
          ) {
            setStepName(step.loading);
            // redirect to mm https://metamask.io/download/
          } else {
            // ...
          }
        }}
      />
    </a>
  );
};
