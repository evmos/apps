import { STEP_STATUS } from "./buttons/utils";
import { GroupStateI, CompleteStepI, HandleStepErrorsI } from "./types";

export const checkAllDoneStatus = (groupState: GroupStateI[]) => {
  return groupState.every(
    (obj) => obj.hasOwnProperty("status") && obj.status === STEP_STATUS.DONE
  );
};

export const handleStepError = ({
  setStatus,
  setText,
  step,
  setTextError,
  index,
  text,
}: HandleStepErrorsI) => {
  setStatus(STEP_STATUS.CURRENT);
  setText(text);
  if (step.errorsText) {
    setTextError(step.errorsText[index]);
  }
};

export const completeStep = ({
  setStatus,
  setGroupState,
  setText,
  step,
}: CompleteStepI) => {
  setText(step.doneText);
  setStatus(STEP_STATUS.DONE);
  setGroupState((state) =>
    state.map((actionGroup) =>
      actionGroup.id === step.id
        ? {
            ...actionGroup,
            status: STEP_STATUS.DONE,
          }
        : actionGroup
    )
  );
};

// if the prevStep is done, set the status to current.
export const updateCurrentStatus = (
  groupState: GroupStateI[],
  currentIndex: number
) => {
  const updatedState = [...groupState];
  const prevStep = updatedState[currentIndex - 1];
  if (prevStep && prevStep.status === STEP_STATUS.DONE) {
    const currentStep = updatedState[currentIndex];
    const updatedStep = { ...currentStep, status: STEP_STATUS.CURRENT };
    updatedState[currentIndex] = updatedStep;
  }
  return updatedState;
};
