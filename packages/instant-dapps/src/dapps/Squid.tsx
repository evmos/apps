// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import Squid from "@evmosapps/widgets/src/squid";
import { InstantDappContainer } from "./instant-dapp-container";

export default function SquidInstantDapp() {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/squid-blur.png)]"
      dappName="Squid"
      widget={<Squid />}
    />
  );
}
