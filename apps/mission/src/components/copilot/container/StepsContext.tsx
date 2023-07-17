import React, { createContext, useState } from "react";

import { STEP_STATUS } from "../steps/setUpAccount/buttons/utils";
import { steps } from "./data";

type StepsPropsContext = {
  stepsStatus: {
    status: string;
    index: number;
    component: JSX.Element;
    title: string;
  }[];
  updateStepsStatus: () => void;
};

const initialValue = steps.map((step, index) => ({
  status: step.status,
  index,
  component: step.component,
  title: step.title,
}));

const StepsContext = createContext<StepsPropsContext>({
  stepsStatus: [],
  updateStepsStatus: () => {},
});

const StepsContextProvider = ({ children }: { children: JSX.Element }) => {
  const [stepsStatus, setStepsStatus] = useState(initialValue);

  const updateStepsStatus = () => {
    const updatedState = [...stepsStatus];
    const currentElement = updatedState.find(
      (element) => element.status === STEP_STATUS.CURRENT
    );
    if (currentElement === undefined) {
      return;
    }
    const currentStep = updatedState[currentElement.index];
    const updatedStep = { ...currentStep, status: STEP_STATUS.DONE };
    const nextStep = updatedState[currentElement.index + 1];
    if (nextStep) {
      const nextStepUpdated = { ...nextStep, status: STEP_STATUS.CURRENT };

      updatedState[currentElement.index] = updatedStep;
      updatedState[currentElement.index + 1] = nextStepUpdated;
    }

    setStepsStatus(updatedState);
  };

  return (
    <StepsContext.Provider value={{ stepsStatus, updateStepsStatus }}>
      {children}
    </StepsContext.Provider>
  );
};

export { StepsContext, StepsContextProvider };
