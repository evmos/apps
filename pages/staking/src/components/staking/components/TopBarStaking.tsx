// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import {
  TopBarItem,
  TopBarContainer,
  ConfirmButton,
  Tooltip,
} from "@evmosapps/ui-helpers";
import { useRewards } from "@evmosapps/evmos-wallet";
import { convertFromAtto, displayTopBarTooltip } from "helpers";
import { BigNumber } from "@ethersproject/bignumber";
import { useStakingInfo } from "@evmosapps/evmos-wallet/src/api/useStake";
import { useAccount } from "wagmi";
import { StatefulCountdown } from "./stateful-countdown";
import { useEvmosBalance } from "@evmosapps/evmos-wallet/src/api/useEvmosBalance";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils";
import { CLAIM_REWARDS_THRESHOLD } from "@evmosapps/constants";

const TopBarStaking = () => {
  const { isDisconnected } = useAccount();
  const { totalDelegations, totalUndelegations, totalRewards } =
    useStakingInfo();
  const { evmosBalance } = useEvmosBalance();
  const { claimRewards, isPending, isSuccess } = useRewards();

  return (
    <TopBarContainer>
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
            <p>{Number(convertFromAtto(totalDelegations)).toFixed(2)} EVMOS</p>
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
                  {Number(convertFromAtto(totalUndelegations)).toFixed(2)} EVMOS
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

      <TopBarItem text="Reward Distribution" value={<StatefulCountdown />} />

      <ConfirmButton
        title={`Claim Rewards: ${formatUnits(totalRewards, 18)} EVMOS`}
        className="w-fit px-4 text-xs"
        text={
          <div>
            Claim Rewards: <p>{formatUnits(totalRewards, 18, 3)} EVMOS</p>
          </div>
        }
        onClick={claimRewards}
        disabled={
          isDisconnected ||
          !totalRewards ||
          isPending ||
          isSuccess ||
          totalRewards < CLAIM_REWARDS_THRESHOLD // ensure that small residual is covered
        }
      />
    </TopBarContainer>
  );
};

export default TopBarStaking;
