// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ChainProvider } from "@cosmos-kit/react";
import { Spinner } from "@interchain-ui/react";
import dynamic from "next/dynamic";
import { chains, assets } from "chain-registry";
import { wallets } from "cosmos-kit";

const CustomLiquidityModal = dynamic(() => import("./custom-liquidity-modal"), {
  loading: () => (
    <div className="w-full items-center justify-center sm:h-full">
      <Spinner color="purple" />
    </div>
  ),
});

const LeapElements = () => {
  return (
    <div className="w-full">
      <ChainProvider chains={chains} assetLists={assets} wallets={[...wallets]}>
        {/* ... other components */}
        <CustomLiquidityModal />
      </ChainProvider>
    </div>
  );
};

export default LeapElements;
