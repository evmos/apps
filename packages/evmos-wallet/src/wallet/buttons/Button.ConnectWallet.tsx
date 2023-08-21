// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { CLICK_CONNECT_WALLET_BUTTON, useTracker } from "tracker";

export const ButtonConnectWallet = ({
  setShow,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handlePreClickAction: trackClickConnectWallet } = useTracker(
    CLICK_CONNECT_WALLET_BUTTON
  );
  return (
    <button
      onClick={() => {
        setShow(true);
        trackClickConnectWallet();
      }}
      className="font-sm text-pearl bg-red hover:bg-red1 active:bg-red2 rounded-full px-10 py-2 font-bold"
    >
      Connect
    </button>
  );
};
