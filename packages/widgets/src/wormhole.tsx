// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import WormholeBridge, {
  WormholeConnectConfig,
} from "@wormhole-foundation/wormhole-connect";

const Wormhole = () => {
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
};

export default Wormhole;
