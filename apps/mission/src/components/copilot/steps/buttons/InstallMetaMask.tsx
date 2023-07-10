import { useEffect, useRef, useState } from "react";
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

  const firstUpdate = useRef(true);
  useEffect(() => {
    const isProviderInstalled = () => {
      if (window.ethereum && window.ethereum?.isMetaMask) {
        setText(step.done);
        setStatus(statusProps.DONE);
        return true;
      }
      return false;
    };

    if (firstUpdate.current) {
      isProviderInstalled();
      firstUpdate.current = false;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        isProviderInstalled();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [step]);

  const handleClick = async () => {
    if (!isProviderInstalled()) {
      setStatus(statusProps.PROCESSING);
      setText(step.loading[0]);
      window.open(step.href, "_blank");
    }
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
      }}
    />
  );
};
