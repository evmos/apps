"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector } from "react-redux";

import {
  TopBarItem,
  Countdown,
  TopBarContainer,
  ConfirmButton,
  Tooltip,
} from "@evmosapps/ui-helpers";
import { useEvmosBalance, useRewards } from "@evmosapps/evmos-wallet";
import { StoreType } from "@evmosapps/evmos-wallet";
import { convertFromAtto, displayTopBarTooltip } from "helpers";
import { FULL_DAY_MINUS_ONE_SECOND } from "constants-helper";
import { BigNumber } from "@ethersproject/bignumber";
import { useEpochDay } from "../../../utils/hooks/useEpochDay";
import { useStakingInfo } from "../../../utils/hooks/useStakingInfo";

const TopBarStaking = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { totalDelegations, totalUndelegations, totalRewards } =
    useStakingInfo();
  const { evmosBalance } = useEvmosBalance();
  const { epochs } = useEpochDay();
  const { handleConfirmButton } = useRewards(value, totalRewards);
  return (
    <TopBarContainer>
      <>
        <TopBarItem
          text="Available"
          value={
            !displayTopBarTooltip(evmosBalance) ? (
              <p>
                {evmosBalance.eq(BigNumber.from(-1))
                  ? "0.00"
                  : Number(convertFromAtto(evmosBalance)).toFixed(2)}{" "}
                EVMOS
              </p>
            ) : (
              <Tooltip
                className="left-1/2 top-5"
                element={
                  <p className="cursor-default">
                    {evmosBalance.eq(BigNumber.from(-1))
                      ? "0.00"
                      : Number(convertFromAtto(evmosBalance)).toFixed(2)}{" "}
                    EVMOS
                  </p>
                }
                text={
                  <p className="text-sm opacity-80">
                    {evmosBalance.eq(BigNumber.from(-1))
                      ? "0.00"
                      : Number(convertFromAtto(evmosBalance))
                          .toFixed(6)
                          .replace(/\.?0+$/, "")}{" "}
                    EVMOS
                  </p>
                }
              />
            )
          }
        />
        <TopBarItem
          text="Total Staked"
          value={
            !displayTopBarTooltip(totalDelegations) ? (
              <p>
                {Number(convertFromAtto(totalDelegations)).toFixed(2)} EVMOS
              </p>
            ) : (
              <Tooltip
                className="left-1/2 top-5"
                element={
                  <p className="cursor-default">
                    {Number(convertFromAtto(totalDelegations)).toFixed(2)} EVMOS
                  </p>
                }
                text={
                  <p className="text-sm opacity-80">
                    {Number(convertFromAtto(totalDelegations))
                      .toFixed(6)
                      .replace(/\.?0+$/, "")}{" "}
                    EVMOS
                  </p>
                }
              />
            )
          }
        />

        <TopBarItem
          text="Total Unstaked"
          value={
            !displayTopBarTooltip(totalUndelegations) ? (
              <p>
                {Number(convertFromAtto(totalUndelegations)).toFixed(2)} EVMOS
              </p>
            ) : (
              <Tooltip
                className="left-1/2 top-5"
                element={
                  <p className="cursor-default">
                    {Number(convertFromAtto(totalUndelegations)).toFixed(2)}{" "}
                    EVMOS
                  </p>
                }
                text={
                  <p className="text-sm opacity-80">
                    {Number(convertFromAtto(totalUndelegations))
                      .toFixed(6)
                      .replace(/\.?0+$/, "")}{" "}
                    EVMOS
                  </p>
                }
              />
            )
          }
        />
        <TopBarItem
          text="Reward Distribution"
          value={
            <Countdown
              epochs={
                epochs > 1000
                  ? epochs + FULL_DAY_MINUS_ONE_SECOND
                  : "Loading..."
              }
            />
          }
        />
        <div className=" ">
          <ConfirmButton
            className="w-fit px-4 text-sm"
            text={
              <div>
                Claim Rewards: <p>{totalRewards.toFixed(2)} EVMOS</p>
              </div>
            }
            onClick={handleConfirmButton}
            disabled={
              !value.active || !totalRewards || totalRewards < 0.005 // insure that small residual is covered
            }
          />
        </div>
      </>
    </TopBarContainer>
  );
};

export default TopBarStaking;
