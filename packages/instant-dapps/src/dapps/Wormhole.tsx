"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import WormholeBridge, {
  WormholeConnectConfig,
} from "@wormhole-foundation/wormhole-connect";

export default function Wormhole() {
  const config: WormholeConnectConfig = {
    env: "mainnet",
    bridgeDefaults: {
      fromNetwork: "ethereum",
      toNetwork: "evmos",
      token: "USDCeth",
    },
  };

  return (
    <div className="-mt-2">
      <WormholeBridge config={config} />
    </div>
  );
}
