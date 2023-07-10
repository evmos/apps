import { useState } from "react";
import { ButtonCopilot } from "./ButtonCopilot";
import { statusProps } from "./utills";
import {
  changeNetworkToEvmosMainnet,
  switchEthereumChain,
  getWallet,
} from "evmos-wallet";
export const ConnectMetamask = ({
  step,
  index,
  length,
}: {
  step: any;
  index: number;
  length: number;
}) => {
  console.log("asd");
  const defaultText = step.name;
  const [text, setText] = useState(defaultText);
  const [status, setStatus] = useState(statusProps.CURRENT);

  const isMMConnected = async () => {
    // How can we difference between Approve and switch network ???
    if (await changeNetworkToEvmosMainnet()) {
      setText(step.loading[1]);
      await getWallet();
      setText(step.done);
      setStatus(statusProps.DONE);

      return true;
    }
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
    if (
      !(await switchEthereumChain(
        process.env.NEXT_PUBLIC_EVMOS_ETH_CHAIN_ID ?? "0x2329"
      ))
    ) {
      setStatus(statusProps.PROCESSING);
      setText(step.loading[0]);
      const connected = await isMMConnected();

      //   window.open(step.href, "_blank");
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
