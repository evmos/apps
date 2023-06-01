// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// this is not working for the test. evmos-wallet package
// how do we manage redux?
// import { ButtonWalletConnection, StoreType } from "evmos-wallet";
// import { useDispatch, useSelector } from "react-redux";
import { Header } from "ui-helpers";
import { Dispatch, SetStateAction } from "react";
import { CLICK_EVMOS_LOGO, useTracker } from "tracker";
export const StatefulHeader = ({
  pageName,
  setShowSidebar,
}: {
  pageName: string;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
}) => {
  // const wallet = useSelector((state: StoreType) => state.wallet.value);
  // const dispatch = useDispatch();

  const { handlePreClickAction } = useTracker(CLICK_EVMOS_LOGO);
  return (
    <Header
      pageName={pageName}
      setShowSidebar={setShowSidebar}
      walletConnectionButton={
        <></>
        // <ButtonWalletConnection walletExtension={wallet} dispatch={dispatch} />
      }
      onClick={() => {
        handlePreClickAction({
          wallet: "1",
          provider: "2",
          page: pageName,
        });
      }}
    />
  );
};
