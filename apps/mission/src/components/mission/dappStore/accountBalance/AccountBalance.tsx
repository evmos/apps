// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { convertFromAtto } from "helpers";
import { Button } from "../Button";
import { StepsContext } from "copilot";
import { useContext } from "react";
import { useTranslation } from "next-i18next";
import { StoreType, useAssets, useStake } from "evmos-wallet";
import { useSelector } from "react-redux";
import { CLICK_ON_TOP_UP_ACCOUNT_DAPP, useTracker } from "tracker";
import dynamic from "next/dynamic";
const Copilot = dynamic(() => import("copilot").then((mod) => mod.Copilot));
export const AccountBalance = () => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const { totalDelegations, totalRewards } = useStake();
  const { evmosPrice, totalEvmosAsset } = useAssets();

  const totalEvmos = totalEvmosAsset.add(totalDelegations);
  // staked + evmos + rewards
  let totalBalance = Number(convertFromAtto(totalEvmos)) + totalRewards;

  const totalBalanceInDollars = totalBalance * Number(evmosPrice);

  const drawTotalBalance = () => {
    if (totalBalance === 0) {
      return 0;
    }
    if (totalBalance < 1) {
      return totalBalance.toFixed(2);
    }
    return totalBalance.toFixed(0);
  };

  const drawTotalBalanceInDollars = () => {
    if (isNaN(totalBalanceInDollars)) {
      return 0;
    }
    if (totalBalanceInDollars < 1) {
      return totalBalanceInDollars.toFixed(2);
    }
    return totalBalanceInDollars.toFixed(0);
  };

  const { setShowModal } = useContext(StepsContext);

  const { t } = useTranslation();

  const { handlePreClickAction } = useTracker(CLICK_ON_TOP_UP_ACCOUNT_DAPP);

  const handleClick = () => {
    handlePreClickAction({ location: "On the main page" });
    setShowModal(true);
  };
  return (
    <>
      <Copilot />
      <section className="mb-7 text-left md:mx-0">
        <p className="mb-2 text-xl text-pearl md:text-2xl ">
          {t("dappStore.account.balance.title")}
        </p>
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 ">
          <div>
            <h6 className="text-4xl font-bold text-white md:text-6xl">
              {wallet.active ? drawTotalBalance() : "- "}
              <span className="ml-2 text-4xl font-bold uppercase text-white opacity-50 md:text-6xl">
                {t("evmos.token")}
              </span>
            </h6>
            <p className="mt-4 text-xl text-white opacity-50">
              ${wallet.active ? drawTotalBalanceInDollars() : "-"}
            </p>
          </div>
          {wallet.active && (
            <div className="md:relative md:left-[16px] md:top-[11px] ">
              <Button
                handleOnClick={handleClick}
                text={t("dappStore.account.balance.topUp")}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
