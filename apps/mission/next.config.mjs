// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { withEvmosConfig } from "@evmosapps/config/next/with-config.js";

export default withEvmosConfig({
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
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
    ],
  },
});
