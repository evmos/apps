// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import Transak from "@evmosapps/widgets/src/transak";
import { InstantDappContainer } from "./instant-dapp-container";

export default function TransakInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/transak-blur.png)]"
      dappName="Transak"
      widget={<Transak />}
    />
  );
}
