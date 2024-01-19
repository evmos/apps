// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";


import Forge from "@evmosapps/widgets/src/forge";
import { InstantDappContainer } from "./instant-dapp-container";

export default function ForgeInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/forge-blur.png)]"
      dappName="Forge"
      widget={<Forge />}
    />
  );
}
