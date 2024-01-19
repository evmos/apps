// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";


import Osmosis from "@evmosapps/widgets/src/Osmosis/Osmosis";
import { InstantDappContainer } from "./instant-dapp-container";

export default function OsmosisInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/osmosis-blur.png)]"
      dappName="Osmosis"
      widget={<Osmosis />}
    />
  );
}
