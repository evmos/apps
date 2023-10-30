// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { withEvmosConfig } from "@evmosapps/config/next/with-config.js";
import locale from "./next-i18next.config.js";
export default withEvmosConfig({
  basePath: "/folio",
  i18n: locale.i18n,
});
