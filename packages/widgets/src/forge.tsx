// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { SwapWidget } from "forgetwidgets";
import "forgetwidgets/fonts.css";

const Forge = () => {
  return (
    <div className="Uniswap">
      <SwapWidget
        width={"100%"}
        defaultChainId={9001}
        routerUrl={"https://forge-router.evmosdao.xyz/"}
      />
    </div>
  );
};

export default Forge;
