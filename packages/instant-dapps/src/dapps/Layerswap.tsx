"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useAccount } from "wagmi";

export default function LayerSwap() {
  // address has to be 0x format
  const { address } = useAccount();
  return (
    <div data-testid="layerswap-widget" className="w-full h-[660px]">
      <iframe
        style={{
          height: "100%",
          width: "100%",
          border: "none",
          borderRadius: "15px",
        }}
        src={`https://layerswap.io/app/?to=EVMOS_MAINNET&destAddress=${address}&addressSource=evmos`}
      ></iframe>
    </div>
  );
}
