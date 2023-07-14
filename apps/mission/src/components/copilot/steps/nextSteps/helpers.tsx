import ReactDOM from "react-dom";
import { Fireworks, FireworksHandlers } from "@fireworks-js/react";

const handleRedirect = (url: string) => {
  window.open(url, "_blank");
};
export const handleInteractWithdApp = () => {
  handleRedirect("https://evmos.org/ecosystem");
};
export const handleStakeWithEvmos = () => {
  handleRedirect("https://app.evmos.org/staking");
};
export const handleLearnMore = () => {
  handleRedirect("https://academy.evmos.org/faq");
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
