// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TopBarContainer, TopBarItem } from "ui-helpers";

import { convertFromAtto, amountToDollars } from "helpers";

import { useHeaderInfo } from "../../internal/functionality/hooks/useHeaderInfo";
import useAssetsTopBar from "../../internal/functionality/hooks/useAssetsTopBar";
import { useCallback } from "react";
import metrics from "./LocalTracker";
import { MC_TOTAL_STAKED } from "tracker";
const TopBarMissionControl = () => {
  const { totalStaked, totalRewards } = useHeaderInfo();
  const { totalAssets, evmosPrice, totalEvmosAsset } = useAssetsTopBar();
  const totalEvmos = totalEvmosAsset.add(totalStaked);

  const totalAmountDollars = amountToDollars(
    totalStaked,
    18,
    Number(evmosPrice)
  );

  const handlePreClickAction = useCallback(() => {
    return metrics?.track(MC_TOTAL_STAKED);
  }, []);
  return (
    <TopBarContainer>
      <>
        <TopBarItem
          // it shows the total amount of ALL assets including
          // cosmosBalance and erc20Balance + total staked in dollars
          text="Total Assets"
          value={`$${(totalAssets + Number(totalAmountDollars)).toFixed(2)}`}
        />

        <TopBarItem
          // it shows the total amount of evmos + wevmos + stakedEvmos
          text="Total EVMOS"
          value={`${Number(convertFromAtto(totalEvmos)).toFixed(2)} EVMOS`}
        />

        <TopBarItem
          // it shows the total amount of delegations
          text="Total Staked"
          value={`
          ${Number(convertFromAtto(totalStaked)).toFixed(2)} EVMOS`}
          href="/staking"
          onClick={handlePreClickAction}
        />
        {/* displays the total rewards availables */}
        <TopBarItem
          text="Total Rewards Available"
          value={`${totalRewards.toFixed(2)} EVMOS`}
        />

        <TopBarItem text="EVMOS Price" value={`$${evmosPrice}`} />
      </>
    </TopBarContainer>
  );
};

export default TopBarMissionControl;
