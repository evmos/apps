import { useEffect, useRef, useState } from "react";
import { STEP_STATUS } from "./utils";
import { GroupStateI, SetUpAccountI } from "../types";
import { useTranslation } from "react-i18next";

export const useStep = (
  step: SetUpAccountI,
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>
) => {
  const [text, setText] = useState(step.name);
  const [status, setStatus] = useState(STEP_STATUS.CURRENT);
  const [textError, setTextError] = useState("");
  const { t } = useTranslation();

  const callActions = async () => {
    setStatus(STEP_STATUS.PROCESSING);
    const len = step.actions.length;
    for (let index = 0; index < len; index++) {
      const action = step.actions[index];
      setText(step.loading[index]);

      if (step.href !== undefined) {
        await action();
        break;
      }
      const localAction = await action();
      if (localAction === false) {
        setStatus(STEP_STATUS.CURRENT);
        setText(t("setupaccount.action.error"));
        if (step.errors) {
          setTextError(step.errors[index]);
        }
        break;
      } else {
        if (index === len - 1) {
          // All actions have returned true
          setText(step.done);
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
        }
      }
    }
  };
  const firstUpdate = useRef(true);
  useEffect(() => {
    const check = async () => {
      if (await step.checkAction()) {
        setText(step.done);
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
