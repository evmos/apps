// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import LayerSwap from "@evmosapps/widgets/src/layerswap";
import { InstantDappContainer } from "./instant-dapp-container";

export default function LayerSwapInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/layerswap-blur.png)]"
      dappName="Layerswap"
      widget={<LayerSwap />}
    />
  );
}
