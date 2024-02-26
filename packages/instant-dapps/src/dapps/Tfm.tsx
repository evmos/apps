"use client";

import Tfm from "@evmosapps/widgets/src/tfm";
import { InstantDappContainer } from "./instant-dapp-container";

export default function WormholeInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/tfm-blur.png)]"
      dappName="Tfm"
      widget={<Tfm />}
    />
  );
}
