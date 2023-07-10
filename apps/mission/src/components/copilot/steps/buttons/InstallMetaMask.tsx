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

  const isActionDone = () => {
    if (step.actions[0]()) {
      setText(step.done);
      setDisable(true);
      setStatus(statusProps.DONE);
      return true;
    }

    return false;
  };

  const handleActions = useCallback(() => {
    if (!isActionDone()) {
      setStatus(statusProps.PROCESSING);
      setDisable(true);
      setText(step.loading[0]);
      window.open(step.href, "_blank");
      return false;
    }
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      isActionDone();
      firstUpdate.current = false;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        isActionDone();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActionDone]);

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
      }}
    />
  );
};
