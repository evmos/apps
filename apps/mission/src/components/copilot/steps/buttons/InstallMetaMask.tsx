import { useEffect, useRef, useState } from "react";
import { ButtonCopilot } from "./ButtonCopilot";

const steps = [
  {
    id: "install MM",
    name: "Install MetaMask",
    loading: "Waiting for MetaMask Setup",
    done: "Metamask Installed",
    href: "https://metamask.io/download/",
  },
];

export const InstallMetaMask = () => {
  const defaultText = steps[0].name;
  const [text, setText] = useState(defaultText);
  const [status, setStatus] = useState("current");

  const isProviderInstalled = () => {
    if (window.ethereum && window.ethereum?.isMetaMask) {
      setText(steps[0].done);
      setStatus("complete");
      return true;
    }
    return false;
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
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
  }, []);

  const handleClick = async () => {
    if (!isProviderInstalled()) {
      setStatus("upcoming");
      setText(steps[0].loading);
      window.open(steps[0].href, "_blank");
    }
  };

  return (
    <ButtonCopilot
      props={{
        id: steps[0].id,
        name: text,
        index: 1,
        stepsLength: 1,
        status: status,
        handleClick: handleClick,
      }}
    />
  );
};
