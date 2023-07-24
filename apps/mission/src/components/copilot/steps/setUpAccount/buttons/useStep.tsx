// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useRef, useState } from "react";
import { STEP_STATUS } from "./utils";
import { GroupStateI, SetUpAccountI } from "../types";
import { useTranslation } from "react-i18next";
import { completeStep, handleStepError } from "../helpers";
import { useTracker } from "tracker";

export const useStep = (
  step: SetUpAccountI,
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>
) => {
  const [text, setText] = useState(step.buttonText);
  const [status, setStatus] = useState(STEP_STATUS.CURRENT);
  const [textError, setTextError] = useState("");
  const { t } = useTranslation();
  const { handlePreClickAction: initTracker } = useTracker(step.tracker.init);
  const { handlePreClickAction: successfullTrack } = useTracker(
    step.tracker.successful
  );
  const { handlePreClickAction: unsuccessfullTrack } = useTracker(
    step.tracker.unsuccessful
  );
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
        unsuccessfullTrack({
          provider: step.tracker.provider,
          errorMessage: step.errorsText && step.errorsText[index],
        });
        break;
      } else {
        if (index === len - 1) {
          // All actions have returned true
          completeStep({
            setStatus,
            setText,
            step,
            setGroupState,
          });

          successfullTrack({
            provider: step.tracker.provider,
          });
        }
      }
    }
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    const check = async () => {
      if (await step.checkAction()) {
        completeStep({
          setStatus,
          setText,
          step,
          setGroupState,
        });
        successfullTrack({
          provider: step.tracker.provider,
        });
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
  }, [step, status, setGroupState, successfullTrack]);

  const handleClick = async () => {
    setTextError("");
    initTracker({ provider: step.tracker.provider });
    await callActions();
  };
  return { text, status, textError, handleClick };
};