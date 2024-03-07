// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";

export const WIDGETS: {
  [key: string]: React.ComponentType<{}>;
} = {
  layerswap: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Layerswap"),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    },
  ),
  squid: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Squid"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }),

  c14: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/C14"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }),
  transak: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Transak"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }),
  wormhole: dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/Wormhole"),
    {
      ssr: false,
    },
  ),
  forge: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Forge"), {
    ssr: false,
  }),
  stride: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Stride"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }),
  osmosis: dynamic(() => import("@evmosapps/instant-dapps/src/dapps/Osmosis"), {
    ssr: false,
  }),
  "leap-wallet": dynamic(
    () => import("@evmosapps/instant-dapps/src/dapps/LeapElements"),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    },
  ),
};
