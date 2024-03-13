// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

// BANNER TEMPORAL: A temporary banner was placed until the Evmos chain upgrade.
// At the end of the upgrade delete lines 9, 25 and 28 to 34; and uncomment lines 11 to 13, 16 to 23 and 35 to 37. We need also remove instantdApp.wormhole.disruption in dappStore.json

import { useTranslation } from "@evmosapps/i18n/client";

// import WormholeBridge, {
//   WormholeConnectConfig,
// } from "@wormhole-foundation/wormhole-connect";

const Wormhole = () => {
  // const config: WormholeConnectConfig = {
  //   env: "mainnet",
  //   bridgeDefaults: {
  //     fromNetwork: "ethereum",
  //     toNetwork: "evmos",
  //     token: "USDCeth",
  //   },
  // };

  const { t } = useTranslation("dappStore");

  return (
    <div
      className={`relative blur-image after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-10 after:bg-[rgba(0,0,0,.3)] z-[10] h-[450px] bg-center bg-no-repeat bg-cover ${"bg-[url(/ecosystem/blur/wormhole-blur.png)]"} flex flex-col justify-center`}
    >
      <div className="z-[9999] text-center flex flex-col items-center space-y-3 text-lg px-8">
        <p className="font-light">{t("instantdApp.wormhole.disruption")}</p>
      </div>
    </div>
    // <div className="-mt-2">
    //   <WormholeBridge config={config} />
    // </div>
  );
};

export default Wormhole;
