// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { MAVA_WIDGET_URL } from "@evmosapps/constants";
import Script from "next/script";

export const MavaWidget = () => {
  return (
    <Script
      defer
      src={MAVA_WIDGET_URL}
      id="MavaWebChat"
      widget-version="v2"
      data-token={process.env.NEXT_PUBLIC_MAVA_TOKEN}
    />
  );
};
