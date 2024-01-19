// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import {
  TopBarItem,
  TopBarContainer,
  ConfirmButton,
  Tooltip,
} from "@evmosapps/ui-helpers";
import { useRewards } from "@evmosapps/evmos-wallet";
import { StoreType } from "@evmosapps/evmos-wallet";
import { convertFromAtto, displayTopBarTooltip } from "helpers";
import { BigNumber } from "@ethersproject/bignumber";
import { useStakingInfo } from "../../../utils/hooks/useStakingInfo";
import { useAccount } from "wagmi";
import { StatefulCountdown } from "./stateful-countdown";
import { useEvmosBalance } from "../../../utils/hooks/useEvmosBalance";

const TopBarStaking = () => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const { isDisconnected } = useAccount();
  const { totalDelegations, totalUndelegations, totalRewards } =
    useStakingInfo();
  const { evmosBalance } = useEvmosBalance();

  const [confirmClicked, setConfirmClicked] = useState(false);

  const { handleConfirmButton } = useRewards({
    wallet,
    setConfirmClicked,
  });
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

        <TopBarItem text="Reward Distribution" value={<StatefulCountdown />} />

        <div className=" ">
          <ConfirmButton
            className="w-fit px-4 text-xs"
            text={
              <div>
                Claim Rewards: <p>{totalRewards.toFixed(2)} EVMOS</p>
              </div>
            }
            onClick={handleConfirmButton}
            disabled={
              isDisconnected ||
              !totalRewards ||
              confirmClicked ||
              totalRewards < 0.005 // insure that small residual is covered
            }
          />
        </div>
      </>
    </TopBarContainer>
  );
};

export default TopBarStaking;
