// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
// BANNER TEMPORAL: A temporary banner was placed until the Evmos chain upgrade.

import Wormhole from "@evmosapps/widgets/src/wormhole";
// import { InstantDappContainer } from "./instant-dapp-container";

export default function WormholeInstantDapp() {
  return (
    <Wormhole />
    // <InstantDappContainer
    //   image="bg-[url(/ecosystem/blur/wormhole-blur.png)]"
    //   dappName="Wormhole"
    //   widget={<Wormhole />}
    // />
  );
}
