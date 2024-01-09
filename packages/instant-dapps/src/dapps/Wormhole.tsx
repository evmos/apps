"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Wormhole from "@evmosapps/widgets/src/wormhole";
import { InstantDappContainer } from "./instant-dapp-container";

export default function WormholeInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/wormhole-blur.png)]"
      dappName="Wormhole"
      widget={<Wormhole />}
    />
  );
}
