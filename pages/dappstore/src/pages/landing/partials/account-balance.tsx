// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

// import { convertFromAtto } from "helpers";

import { useTranslation } from "@evmosapps/i18n/client";
// import { useAssets, useStake } from "@evmosapps/evmos-wallet";
import { CLICK_ON_TOP_UP_ACCOUNT_DAPP, sendEvent } from "tracker";

import { useAccount } from "wagmi";
import { TopupModalTrigger } from "stateful-components/src/modals/TopupModal/TopupModal";
import { useStake } from "@evmosapps/evmos-wallet/src/api/useStake";
import { useAssets } from "@evmosapps/evmos-wallet/src/api/useAssets";
import { convertFromAtto } from "helpers/src/styles";
import { PrimaryButton } from "@evmosapps/ui-helpers";
// import { ButtonWithoutLink } from "@evmosapps/ui-helpers";

export const AccountBalance = () => {
  const { isConnected } = useAccount();
  const { totalDelegations, totalRewards } = useStake();
  const { evmosPrice, totalEvmosAsset } = useAssets();

  const totalEvmos = totalEvmosAsset.add(totalDelegations);
  // staked + evmos + rewards
  const totalBalance = Number(convertFromAtto(totalEvmos)) + totalRewards;

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

  const { t } = useTranslation("dappStore");

  return (
    <section className="text-left md:mx-0">
      <p className="mb-2 text-lg text-[#E8DFD3] md:text-2xl">
        {t("account.balance.title")}
      </p>
      <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 ">
        <div>
          <h6 className="text-3xl font-bold text-white md:text-5xl">
            {isConnected ? drawTotalBalance() : "- "}
            <span className="ml-2 text-3xl font-bold uppercase text-white opacity-50 md:text-5xl">
              EVMOS
            </span>
          </h6>
          <p className="mt-4 text-lg text-white opacity-50">
            ${isConnected ? drawTotalBalanceInDollars() : "-"}
          </p>
        </div>
        {isConnected && (
          <div className="md:relative md:left-[16px] md:top-[1px] ">
            <TopupModalTrigger>
              <PrimaryButton
                onClick={() => {
                  sendEvent(CLICK_ON_TOP_UP_ACCOUNT_DAPP, {
                    Location: "Home Page",
                  });
                }}
              >
                {t("account.balance.topUp")}
              </PrimaryButton>
            </TopupModalTrigger>
          </div>
        )}
      </div>
    </section>
  );
};
