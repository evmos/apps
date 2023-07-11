import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonCopilot } from "./ButtonCopilot";
import { statusProps } from "./utills";

export const InstallMetaMask = ({
  step,
  index,
  length,
}: {
  step: any;
  index: number;
  length: number;
}) => {
  const defaultText = step.name;
  const [text, setText] = useState(defaultText);
  const [status, setStatus] = useState(statusProps.CURRENT);
  const [disable, setDisable] = useState(false);

  const firstUpdate = useRef(true);

  const isActionDone = useCallback(() => {
    if (step.actions[0]()) {
      setText(step.done);
      setDisable(true);
      setStatus(statusProps.DONE);
      return true;
    }

    return false;
  }, [step]);

  const handleActions = useCallback(() => {
    if (!isActionDone()) {
      setStatus(statusProps.PROCESSING);
      setDisable(true);
      setText(step.loading[0]);
      window.open(step.href, "_blank");
      return false;
    }
  }, [step, isActionDone]);

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
  }, [step]);

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     isActionDone();
  //     firstUpdate.current = false;
  //   }

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "visible") {
  //       isActionDone();
  //     }
  //   };
  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [isActionDone]);

  return (
    <ButtonCopilot
      props={{
        id: step.id,
        name: text,
        index,
        stepsLength: length,
        status: status,
        handleClick: () => handleActions(),
        disabled: disable,
        textError: "",
      }}
    />
  );
};
