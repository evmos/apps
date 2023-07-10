import { useState } from "react";
import { ButtonCopilot } from "./ButtonCopilot";
import { statusProps } from "./utills";
import {
  changeNetworkToEvmosMainnet,
  switchEthereumChain,
  getWallet,
} from "evmos-wallet";
import { store, Metamask } from "evmos-wallet";
export const ConnectMetamask = ({
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
  const [textError, setTextError] = useState("");
  const isMMConnected = async () => {
    if (!(await step.actions[0]())) {
      setStatus(statusProps.PROCESSING);
      // setDisable(true);

      setText(step.loading[0]);
    }
    // change network
    if (await step.actions[1]()) {
      setText(step.loading[1]);
      // setDisable(true);
      // it has two paths to get the value null. Should I change something or always show the same error ?

      // getWAllet
      const wallet = await step.actions[2]();

      if (wallet === null) {
        setText("Try again");
        setTextError(step.errors[2]);
        return;
        // TODO: show error
      }
      setText(step.loading[2]);

      const sign = await step.actions[3]();
      if (sign === false) {
        setText("Try again");
        setTextError(step.errors[3]);
        return;
      }

      setText(step.done);
      setStatus(statusProps.DONE);

      return true;
    }

    setText("Try again");
    setTextError(step.errors[1]);
    setStatus(statusProps.CURRENT);
    // setDisable(false);
    return false;
  };

  //   const firstUpdate = useRef(true);
  //   useEffect(() => {
  //     if (firstUpdate.current) {
  //       isMMConnected();
  //       firstUpdate.current = false;
  //     }

  //     const handleVisibilityChange = async () => {
  //       if (document.visibilityState === "visible") {
  //         await isMMConnected();
  //       }
  //     };
  //     document.addEventListener("visibilitychange", handleVisibilityChange);

  //     return () => {
  //       document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     };
  //   }, []);

  const handleClick = async () => {
    // if (
    //   !(await switchEthereumChain(
    //     process.env.NEXT_PUBLIC_EVMOS_ETH_CHAIN_ID ?? "0x2329"
    //   ))
    // ) {
    //   setStatus(statusProps.PROCESSING);
    //   setDisable(true);
    //   setText(step.loading[0]);

    //   //   window.open(step.href, "_blank");
    // }
    setTextError("");
    await isMMConnected();
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
