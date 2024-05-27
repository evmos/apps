// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import LeapElements from "@evmosapps/widgets/src/LeapElements/leapElements";
import { InstantDappContainer } from "./instant-dapp-container";

export default function LeapElementsInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/leap-elements-blur.png)]"
      dappName="Leap Elements"
      widget={<LeapElements />}
    />
  );
}
