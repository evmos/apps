// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import Tfm from "@evmosapps/widgets/src/Tfm/tfm";
import { InstantDappContainer } from "./instant-dapp-container";
import "@evmosapps/widgets/src/Tfm/tfm.css";

export default function WormholeInstantDapp() {
  return (
    <div className="widget-container">
      <InstantDappContainer
        image="bg-[url(/ecosystem/blur/tfm-blur.png)]"
        dappName="Tfm"
        widget={<Tfm />}
      />
    </div>
  );
}
