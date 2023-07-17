import ReactDOM from "react-dom";
import { Fireworks, FireworksHandlers } from "@fireworks-js/react";
import { Dispatch, SetStateAction } from "react";

export const handleInteractWithdApp = (
  url: string,
  setShow?: Dispatch<SetStateAction<boolean>>
) => {
  setShow && setShow(false);
  window.open(url, "_blank");
};
export const handleStakeWithEvmos = (
  url: string,
  setShow?: Dispatch<SetStateAction<boolean>>
) => {
  setShow && setShow(false);
  window.open(url, "_blank");
};
export const handleLearnMore = (
  url: string,
  setShow?: Dispatch<SetStateAction<boolean>>
) => {
  setShow && setShow(false);
  window.open(url, "_blank");
};

export const renderFireworksPortal = (
  fireworksRef: React.MutableRefObject<FireworksHandlers | null>,
  portalContainer: HTMLDivElement
) => {
  return ReactDOM.createPortal(
    <Fireworks
      ref={fireworksRef}
      className="pointer-events-none absolute inset-0 z-[99999] overflow-visible"
      options={{ traceSpeed: 5 }}
    />,
    portalContainer
  );
};
