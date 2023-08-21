// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useRouter } from "next/router";
import { Button } from "../Button";
import { BalanceContainer } from "../card/BalanceContainer";
import { Card } from "../card/Card";
import { Description } from "../card/Description";
import { Title } from "../card/Title";
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
} from "evmos-wallet";
import { useTranslation } from "next-i18next";
import { CLICK_ON_STAKE_AND_MANAGE_DELEGATION, useTracker } from "tracker";

export const StakingCard = () => {
  const router = useRouter();
  const { handlePreClickAction } = useTracker(
    CLICK_ON_STAKE_AND_MANAGE_DELEGATION
  );
  const handleOnClick = () => {
    handlePreClickAction();
    router.push("/staking");
  };

  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const { totalDelegations, totalRewards } = useStake();
  const { evmosPrice, totalEvmosAsset } = useAssets();
  const { handleConfirmButton } = useRewards(wallet, totalRewards);

  const { t } = useTranslation();
  return (
    <Card>
      <>
        <div>
          <Title
            firstWord={t("evmos.token")}
            secondWord={t("dappStore.card.staking.title")}
          />
          <Description text={t("dappStore.card.staking.description")} />
        </div>
        <div className="grid grid-cols-1 space-y-3 md:grid-cols-2 md:space-y-0">
          <BalanceContainer
            title={t("dappStore.card.staking.available")}
            amount={getBalance(totalEvmosAsset, wallet.active)}
            amountInDollars={getBalanceInDollars(
              totalEvmosAsset,
              wallet.active,
              evmosPrice
            )}
          />
          <BalanceContainer
            title={t("dappStore.card.staking.staked")}
            amount={getBalance(totalDelegations, wallet.active)}
            amountInDollars={getBalanceInDollars(
              totalDelegations,
              wallet.active,
              evmosPrice
            )}
          />
        </div>
        <div className="flex flex-col items-start space-y-3 rounded-lg bg-[#FFFFFF0F] p-3 md:flex-row md:items-center md:justify-between md:space-y-0">
          <BalanceContainer
            title={t("dappStore.card.staking.rewards")}
            amount={getNumberBalance(totalRewards, wallet.active)}
            amountInDollars={getNumberBalanceInDollars(
              totalRewards,
              wallet.active,
              evmosPrice
            )}
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
            {t("dappStore.card.staking.button.claim")}
          </button>
        </div>
        <Button
          text={t("dappStore.card.staking.button.text")}
          handleOnClick={handleOnClick}
        />
      </>
    </Card>
  );
};
