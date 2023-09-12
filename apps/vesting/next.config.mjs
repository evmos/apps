// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { withEvmosConfig } from "@evmos-apps/config/next/with-config.js";
export default withEvmosConfig({
  basePath: "/vesting",
  headers: async () => {
    return [
      {
        source: "/vesting/manifest.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, content-type, Authorization",
          },
        ],
      },
    ];
  },
});
