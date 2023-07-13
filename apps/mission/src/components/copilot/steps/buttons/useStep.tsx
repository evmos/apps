import { useEffect, useRef, useState } from "react";
import { STEP_STATUS } from "./utils";
import { GroupStateI, SetUpAccountI } from "../types";
import { useTranslation } from "react-i18next";
import { completeStep, handleStepError } from "../helpers";

export const useStep = (
  step: SetUpAccountI,
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>
) => {
  const [text, setText] = useState(step.buttonText);
  const [status, setStatus] = useState(STEP_STATUS.CURRENT);
  const [textError, setTextError] = useState("");
  const { t } = useTranslation();

  const callActions = async () => {
    setStatus(STEP_STATUS.PROCESSING);
    const len = step.actions.length;
    for (let index = 0; index < len; index++) {
      // set loading text
      const action = step.actions[index];
      setText(step.loadingText[index]);

      // for the cases that we have to redirect when the user clicks on the button
      if (step.href !== undefined) {
        await action();
        break;
      }

      const localAction = await action();
      if (localAction === false) {
        handleStepError({
          setStatus,
          setText,
          step,
          setTextError,
          index,
          text: t("setupaccount.action.error"),
        });
        break;
      } else {
        if (index === len - 1) {
          // All actions have returned true
          completeStep({ setStatus, setText, step, setGroupState });
        }
      }
    }
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    const check = async () => {
      if (await step.checkAction()) {
        completeStep({ setStatus, setText, step, setGroupState });
      }
    };

    if (firstUpdate.current) {
      check();
      firstUpdate.current = false;
    }

    if (step.href !== undefined && status !== STEP_STATUS.DONE) {
      const handleVisibilityChange = async () => {
        if (document.visibilityState === "visible") {
          check();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [step, status, setGroupState]);

  const handleClick = async () => {
    setTextError("");
    await callActions();
  };
  return { text, status, textError, handleClick };
};
