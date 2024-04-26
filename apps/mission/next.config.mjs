// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { withEvmosConfig } from "@evmosapps/config/next/with-config.js";

export default withEvmosConfig({
  redirects: async () => {
    return [
      {
        source: "/assets",
        destination: "/portfolio",
        permanent: false,
      },
    ];
  },
  images: {
    domains: ["via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        pathname: "/secure.notion-static.com/**",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",

        pathname: "/db649a25-e00d-4b76-ae35-010494162457/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/evmos/chain-token-registry/main/assets/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: `/evmos/chain-token-registry/${process.env.CHAIN_REGISTRY_REF ?? "main"
          }/assets/**`,
      },

      //https://xjrue5nunmcnbzqo.public.blob.vercel-storage.com/dappstore/img-1ayv-n/src.png
      {
        protocol: "https",
        hostname: "**.vercel-storage.com",
        pathname: "/dappstore/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
});
