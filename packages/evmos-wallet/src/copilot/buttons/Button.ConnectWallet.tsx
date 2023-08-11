import { WalletIcon } from "icons";
import { Dispatch, SetStateAction } from "react";
import { CLICK_CONNECT_WALLET_BUTTON, useTracker } from "tracker";
import { Button } from "ui-helpers";

export const ButtonConnectWallet = ({
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handlePreClickAction: trackClickConnectWallet } = useTracker(
    CLICK_CONNECT_WALLET_BUTTON
  );
  return (
    <Button
      onClick={() => {
        setShow(true);
        trackClickConnectWallet();
      }}
    >
      <div className="flex items-center space-x-2 ">
        <WalletIcon />
        <span>Connect</span>
      </div>
    </Button>
  );
};
