// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import Stride from "@evmosapps/widgets/src/Stride/Stride";
import { InstantDappContainer } from "./instant-dapp-container";

export default function StrideInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/stride-blur.png)]"
      dappName="Stride"
      widget={<Stride />}
    />
  );
}
