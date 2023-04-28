// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Tooltip, TopBarContainer, TopBarItem } from "ui-helpers";

import { convertFromAtto, amountToDollars } from "helpers";

import { useHeaderInfo } from "../../internal/functionality/hooks/useHeaderInfo";
import useAssetsTopBar from "../../internal/functionality/hooks/useAssetsTopBar";
import { BigNumber } from "ethers";

const TopBarMissionControl = () => {
  const { totalStaked, totalRewards } = useHeaderInfo();
  const { totalAssets, evmosPrice, totalEvmosAsset } = useAssetsTopBar();
  const totalEvmos = totalEvmosAsset.add(totalStaked);

  const totalAmountDollars = amountToDollars(
    totalStaked,
    18,
    Number(evmosPrice)
  );
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
          value={
            totalEvmos.eq(BigNumber.from("0")) ? (
              <p> {Number(convertFromAtto(totalEvmos)).toFixed(2)} EVMOS </p>
            ) : (
              <Tooltip
                className="left-1/2 top-5"
                element={
                  <p className="cursor-default">
                    {Number(convertFromAtto(totalEvmos)).toFixed(2)} EVMOS
                  </p>
                }
                text={
                  <p className="text-sm opacity-80">
                    {Number(convertFromAtto(totalEvmos)).toFixed(6)} EVMOS
                  </p>
                }
              />
            )
          }
        />

        <TopBarItem
          // it shows the total amount of delegations
          text="Total Staked"
          value={
            totalStaked.eq(BigNumber.from("0")) ? (
              <p> {Number(convertFromAtto(totalStaked)).toFixed(2)} EVMOS </p>
            ) : (
              <Tooltip
                className="left-1/2 top-5"
                element={
                  <p className="cursor-default">
                    {Number(convertFromAtto(totalStaked)).toFixed(2)} EVMOS
                  </p>
                }
                text={
                  <p className="text-sm opacity-80">
                    {Number(convertFromAtto(totalStaked)).toFixed(6)} EVMOS
                  </p>
                }
              />
            )
          }
        />

        {/* displays the total rewards availables */}
        <TopBarItem
          text="Total Rewards Available"
          value={
            totalRewards === 0 ? (
              <p> {totalRewards.toFixed(2)} EVMOS </p>
            ) : (
              <Tooltip
                className="left-1/2 top-5"
                element={
                  <p className="cursor-default">
                    {totalRewards.toFixed(2)} EVMOS
                  </p>
                }
                text={
                  <p className="text-sm opacity-80">
                    {totalRewards.toFixed(6)} EVMOS
                  </p>
                }
              />
            )
          }
        />

        <TopBarItem text="EVMOS Price" value={`$${evmosPrice}`} />
      </>
    </TopBarContainer>
  );
};

export default TopBarMissionControl;
