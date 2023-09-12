// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { withEvmosConfig } from "@evmos-apps/config/next/with-config.js";
import locale from "./next-i18next.config.js";
export default withEvmosConfig({
  i18n: locale.i18n,
});
