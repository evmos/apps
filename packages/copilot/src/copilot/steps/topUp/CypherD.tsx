// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StoreType } from "evmos-wallet";
import { useSelector } from "react-redux";
import { useTransakEvents } from "./useTransakEvents";
import { useEffect, useRef } from "react";

export const CYPHERD_API_KEY = process.env.NEXT_PUBLIC_CYPHERD_KEY ?? "";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cypher?: any;
  }
}

export default function CypherD() {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  useTransakEvents();
  const ref = useRef(false);

  useEffect(() => {
    if (wallet?.evmosAddressEthFormat && !ref.current) {
      ref.current = true;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window.Cypher({
        address: wallet?.evmosAddressEthFormat,
        theme: "light",
        targetChainIdHex: "0x2329", // Evmos ChainID
        appId: CYPHERD_API_KEY,
        parentComponentId: "cypher-onboading-sdk", // Id of the <div> tag inside which the widget is needed
      });
    }
  }, [wallet?.evmosAddressEthFormat]);

  return (
    <>
      <div className="relative mx-auto mt-[25px]  w-[600px] rounded-[15px] md:w-[600px]">
        <div className="-ml-6 w-[550px]">
          <div // div inside which the widget will be present
            data-testid="cypher-onboading-sdk"
            id="cypher-onboading-sdk" // Id that will be passed to the window.Cypher() call
            className="flex h-full flex-col items-center justify-center"
          ></div>
        </div>
      </div>
    </>
  );
}
