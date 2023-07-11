import { useEffect, useRef, useState } from "react";
import { statusProps } from "./utills";

export const useStep = (step: any) => {
  const [text, setText] = useState(step.name);
  const [status, setStatus] = useState(statusProps.CURRENT);
  const [disable, setDisable] = useState(false);
  const [textError, setTextError] = useState("");

  const callActions = async () => {
    setStatus(statusProps.PROCESSING);
    const len = step.actions.length;
    for (let index = 0; index < len; index++) {
      const action = step.actions[index];
      setText(step.loading[index]);
      setDisable(true);

      console.log("--- STEP en call actions", step);

      //
      if (step.href !== undefined) {
        console.log("entre a undefined");
        await action();
        break;
      }
      console.log(index);
      console.log(step);
      const localAction = await action();
      console.log("localAction", localAction);
      if (localAction === false) {
        console.log("entre a false");
        setStatus(statusProps.CURRENT);

        setText("Try again");
        setTextError(step.errors[index]);
        setDisable(false);
        break;
      } else {
        if (index === len - 1) {
          // All actions have returned true
          setText(step.done);
          setStatus(statusProps.DONE);
          setDisable(true);
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
  }, [step, status]);

  const handleClick = async () => {
    setTextError("");
    await callActions();
  };
  return { text, status, disable, textError, handleClick };
};
