import { useEffect, useRef, useState } from "react";
import { ButtonCopilot } from "./ButtonCopilot";
import { statusProps } from "./utills";
// import { useStep } from "./useStep";
export const ConnectMetamask = ({
  step,
  index,
  length,
}: {
  step: any;
  index: number;
  length: number;
}) => {
  // const { a } = useStep({ step, index, length });

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
      const localAction = await action();
      if (localAction === false) {
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

    if (step.href !== undefined) {
      const handleVisibilityChange = async () => {
        if (document.visibilityState === "visible") {
          // await isMMConnected();
          console.log("lala");
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
  }, [step]);

  const handleClick = async () => {
    setTextError("");
    await callActions();
  };

  return (
    <ButtonCopilot
      props={{
        id: step.id,
        name: text,
        index,
        stepsLength: length,
        status: status,
        handleClick: handleClick,
        disabled: disable,
        textError,
      }}
    />
  );
};
