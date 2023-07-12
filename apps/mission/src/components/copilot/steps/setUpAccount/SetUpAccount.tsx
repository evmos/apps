import { useState } from "react";
import { ActionsMetaMask } from "../buttons/ActionsMetaMask";
import { stepsSetAccount } from "./utils";
import { GroupStateI } from "../types";

const updateState = (groupState: GroupStateI[], currentIndex: number) => {
  const updatedState = [...groupState];
  const nextStep = updatedState[currentIndex - 1];
  if (nextStep && nextStep.status === "done") {
    const currentStep = updatedState[currentIndex];
    const updatedStep = { ...currentStep, status: "current" };
    updatedState[currentIndex] = updatedStep;
  }
  return updatedState;
};

export const SetUpAccount = () => {
  const [groupState, setGroupState] = useState(
    stepsSetAccount.map((step, index) => ({
      id: step.id,
      index,
      status: step.status,
    }))
  );

  return (
    <section className="space-y-3">
      <h3 className="font-bold">Set up your account</h3>
      <p className="font-sm text-[#413836]">
        Having an account allows you to use your Evmos to interact with any
        decentralized applications (dApps) on Evmos.
      </p>
      <p className="font-sm text-[#413836]">
        There are different tools to set up your account such as MetaMask, Keplr
        or WalletConnect. For simplicity, we recommend MetaMask.
      </p>
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {stepsSetAccount.map((step, stepIdx) => {
            return (
              <ActionsMetaMask
                key={step.id}
                step={step}
                index={stepIdx}
                length={stepsSetAccount.length}
                statusButton={updateState(groupState, stepIdx)[stepIdx].status}
                setGroupState={setGroupState}
              />
            );
          })}
        </ol>
      </nav>
    </section>
  );
};
