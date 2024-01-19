// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { MAVA_WIDGET_URL } from "constants-helper";
import Script from "next/script";

export const MavaWidget = () => {
  return (
    <Script
      defer
      src={MAVA_WIDGET_URL}
      id="MavaWebChat"
      data-token={process.env.NEXT_PUBLIC_MAVA_TOKEN}
    />
  );
};
