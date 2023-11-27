"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BalanceDisplay } from "./balance-display";

import { CardDescription } from "../card-description";
import { CardTitle } from "../card-title";
import { useSelector } from "react-redux";
import {
  StoreType,
  useAssets,
  useStake,
  useRewards,
  getBalance,
  getBalanceInDollars,
  getNumberBalance,
  getNumberBalanceInDollars,
} from "@evmosapps/evmos-wallet";
import { useTranslation } from "@evmosapps/i18n/client";
import { CLICK_ON_STAKE_AND_MANAGE_DELEGATION } from "tracker";
import { ButtonWithLink, TrackerEvent } from "@evmosapps/ui-helpers";
import { Card } from "../card";

export const StakingCard = () => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const { totalDelegations, totalRewards } = useStake();
  const { evmosPrice, totalEvmosAsset } = useAssets();
  const { handleConfirmButton } = useRewards(wallet, totalRewards);

  const { t } = useTranslation("dappStore");
  return (
    <Card>
      <>
        <div>
          <CardTitle firstWord={"Evmos"} secondWord={t("card.staking.title")} />
          <CardDescription text={t("card.staking.description")} />
        </div>
        <div className="grid grid-cols-1 space-y-3 md:grid-cols-2 md:space-y-0">
          <BalanceDisplay
            title={t("card.staking.available")}
            amount={getBalance(totalEvmosAsset, wallet.active)}
            amountInDollars={getBalanceInDollars(
              totalEvmosAsset,
              wallet.active,
              evmosPrice
            )}
            data-testid="card-available-balance"
          />
          <BalanceDisplay
            title={t("card.staking.staked")}
            amount={getBalance(totalDelegations, wallet.active)}
            amountInDollars={getBalanceInDollars(
              totalDelegations,
              wallet.active,
              evmosPrice
            )}
            data-testid="card-staked-balance"
          />
        </div>
        <div className="flex flex-col items-start space-y-3 rounded-lg bg-[#FFFFFF0F] p-3 md:flex-row md:items-center md:justify-between md:space-y-0">
          <BalanceDisplay
            title={t("card.staking.rewards")}
            amount={getNumberBalance(totalRewards, wallet.active)}
            amountInDollars={getNumberBalanceInDollars(
              totalRewards,
              wallet.active,
              evmosPrice
            )}
            data-testid="card-claimable-rewards"
          />
          <button
            onClick={handleConfirmButton}
            className={`w-auto space-x-2 rounded bg-red px-4 py-2 text-sm font-bold normal-case text-pearl shadow transition-all duration-300 hover:bg-red1 hover:shadow-md active:bg-red2 
          ${
            !wallet.active || !totalRewards || totalRewards < 0.005
              ? "disabled"
              : ""
          }
        `}
          >
            {t("card.staking.button.claim")}
          </button>
        </div>

        <TrackerEvent event={CLICK_ON_STAKE_AND_MANAGE_DELEGATION}>
          <ButtonWithLink href="/staking">
            {t("card.staking.button.text")}
          </ButtonWithLink>
        </TrackerEvent>
      </>
    </Card>
  );
};
