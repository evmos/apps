import { useEffect, useRef, useState } from "react";
import { statusProps } from "./utills";
import { GroupStateI, SetUpAccountI } from "../types";

export const useStep = (
  step: SetUpAccountI,
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>
) => {
  const [text, setText] = useState(step.name);
  const [status, setStatus] = useState(statusProps.CURRENT);
  const [textError, setTextError] = useState("");

  const callActions = async () => {
    setStatus(statusProps.PROCESSING);
    const len = step.actions.length;
    for (let index = 0; index < len; index++) {
      const action = step.actions[index];
      setText(step.loading[index]);

      //
      if (step.href !== undefined) {
        await action();
        break;
      }
      const localAction = await action();
      if (localAction === false) {
        setStatus(statusProps.CURRENT);

        setText("Try again");
        if (step.errors) {
          setTextError(step.errors[index]);
        }
        break;
      } else {
        if (index === len - 1) {
          // All actions have returned true
          setText(step.done);
          setStatus(statusProps.DONE);
          setGroupState((state) =>
            state.map((actionGroup) =>
              actionGroup.id === step.id
                ? {
                    ...actionGroup,
                    status: "done",
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
        setStatus(statusProps.DONE);
        setGroupState((state) =>
          state.map((actionGroup) =>
            actionGroup.id === step.id
              ? {
                  ...actionGroup,
                  status: "done",
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

    if (step.href !== undefined && status !== statusProps.DONE) {
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
