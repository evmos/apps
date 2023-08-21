// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StoreType, WalletConnection, useAssets } from "evmos-wallet";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "ui-helpers";
import { Dispatch, SetStateAction } from "react";
import { useTracker, CLICK_EVMOS_LOGO } from "tracker";
import { CopilotButton, StepsContextProvider, steps } from "copilot";
import dynamic from "next/dynamic";

const Copilot = dynamic(() => import("copilot").then((mod) => mod.Copilot));

export const StatefulHeader = () => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_EVMOS_LOGO);
  const { evmosPriceFixed } = useAssets();
  return (
    <StepsContextProvider steps={steps}>
      <>
        <Copilot />
        <Header
          pageName="Vesting"
          walletConnectionButton={
            <WalletConnection
              copilotModal={({
                beforeStartHook,
              }: {
                beforeStartHook: Dispatch<SetStateAction<boolean>>;
              }) => <CopilotButton beforeStartHook={beforeStartHook} />}
              dispatch={dispatch}
              walletExtension={wallet}
            />
          }
          onClick={() => {
            handlePreClickAction({
              wallet: wallet?.evmosAddressEthFormat,
              provider: wallet?.extensionName,
              page: "vesting",
            });
          }}
          price={evmosPriceFixed}
        />
      </>
    </StepsContextProvider>
  );
};
