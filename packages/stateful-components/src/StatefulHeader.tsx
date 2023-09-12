// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StoreType, WalletConnection, useAssets } from "evmos-wallet";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "ui-helpers";
import { Dispatch, SetStateAction } from "react";
import { CLICK_EVMOS_LOGO, useTracker } from "tracker";
import { CopilotButton, StepsContextProvider, steps } from "copilot";
import dynamic from "next/dynamic";
import { launchPadItems } from "./launchPad/dApps";
const Copilot = dynamic(() => import("copilot").then((mod) => mod.Copilot));
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "./locales/translate";

export const StatefulHeader = ({
  pageName,
  page,
}: {
  pageName: string;
  page: string;
}) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  const { handlePreClickAction } = useTracker(CLICK_EVMOS_LOGO);
  const { evmosPriceFixed } = useAssets();

  const launchPad = {
    dApps: launchPadItems,
    title: t("launchPad.title") as string,
    badge: t("launchPad.badge.text") as string,
    description: t("launchPad.description") as string,
    button: t("launchPad.button") as string,
  };
  return (
    <StepsContextProvider steps={steps}>
      <>
        <Copilot />
        <TranslationContextProvider locale="en">
          <Header
            launchPad={launchPad}
            pageName={pageName}
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
                page: page,
              });
            }}
            price={evmosPriceFixed}
          />
        </TranslationContextProvider>
      </>
    </StepsContextProvider>
  );
};
