import { useState } from "react";
import { ActionsMetaMask } from "../buttons/ActionsMetaMask";
import { stepsSetAccount } from "./utils";
import { GroupStateI } from "../types";
import { useTranslation } from "next-i18next";
import { STEP_STATUS } from "../buttons/utils";

const updateState = (groupState: GroupStateI[], currentIndex: number) => {
  const updatedState = [...groupState];
  const nextStep = updatedState[currentIndex - 1];
  if (nextStep && nextStep.status === STEP_STATUS.DONE) {
    const currentStep = updatedState[currentIndex];
    const updatedStep = { ...currentStep, status: STEP_STATUS.CURRENT };
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

  const { t } = useTranslation();

  return (
    <section className="space-y-3">
      <h3 className="font-bold">{t("setupaccount.title")}</h3>
      <p className="font-sm text-[#413836]">{t("setupaccount.description")}</p>
      <p className="font-sm text-[#413836]">{t("setupaccount.description2")}</p>
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
