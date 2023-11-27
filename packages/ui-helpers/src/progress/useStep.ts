"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useRef, useState } from "react";
import { GroupStateI, SetUpAccountI } from "./types";
import { completeStep, handleStepError } from "./helpers";
import { STEP_STATUS } from "constants-helper";
import { useTracker } from "tracker";
import { useQueryClient } from "@tanstack/react-query";

export const useStep = (
  step: SetUpAccountI,
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>
) => {
  const [text, setText] = useState(step.buttonText);
  const [status, setStatus] = useState(STEP_STATUS.CURRENT);
  const [textError, setTextError] = useState("");

  const { handlePreClickAction: initTracker } = useTracker(step.tracker.init);
  const { handlePreClickAction: successfullTrack } = useTracker(
    step.tracker.successful
  );
  const { handlePreClickAction: unsuccessfullTrack } = useTracker(
    step.tracker.unsuccessful
  );
  const queryClient = useQueryClient();
  const callActions = async () => {
    setStatus(STEP_STATUS.PROCESSING);
    const len = step.actions.length;
    for (let index = 0; index < len; index++) {
      // set loading text
      const action = step.actions.at(index);
      if (action === undefined) {
        break;
      }
      setText(step.loadingText.at(index) ?? "");

      // for the cases that we have to redirect when the user clicks on the button
      if (step.href !== undefined) {
        await action(queryClient);
        break;
      }

      const localAction = await action(queryClient);
      if (localAction === false) {
        handleStepError({
          setStatus,
          setText,
          step,
          setTextError,
          index,
          text: "Try again",
        });
        unsuccessfullTrack({
          provider: step.tracker.provider,
          errorMessage: step.errorsText && step.errorsText.at(index),
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
    async function check() {
      if (await step.checkAction()) {
        completeStepAndTrack();
      }
    }

    const completeStepAndTrack = () => {
      completeStep({
        setStatus,
        setText,
        step,
        setGroupState,
      });
      successfullTrack({
        provider: step.tracker.provider,
      });
    };

    if (firstUpdate.current) {
      void check();
      firstUpdate.current = false;
    }

    if (step.href !== undefined && status !== STEP_STATUS.DONE) {
      const handleVisibilityChange = async () => {
        if (
          document.visibilityState === "visible" &&
          step.hrefAction !== undefined &&
          step.hrefAction()
        ) {
          await check();
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
    // TODO: I'd rather not disable this role,
    // as not having exhaustive deps is often the source of hard to track bugs
    // but the useTracker hook is returning
    // a new function at every render
    // which itself depends on the parameters passed to it
    // ideally we should address that issue there first
    // and then remove the disable here
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, status, setGroupState]);

  const handleClick = async () => {
    setTextError("");
    initTracker({ provider: step.tracker.provider });
    await callActions();
  };
  return { text, status, textError, handleClick };
};
