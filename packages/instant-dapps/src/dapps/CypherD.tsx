// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import CypherD from "@evmosapps/widgets/src/cypherd";
import { InstantDappContainer } from "./instant-dapp-container";

const CypherDInstantDapp = () => {
  return (
    <InstantDappContainer
      image="bg-[url(/ecosystem/blur/cypher-blur.png)]"
      dappName="Cypher Wallet"
      widget={<CypherD />}
    />
  );
};

export default CypherDInstantDapp;
