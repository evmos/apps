// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

// import { convertFromAtto } from "helpers";

import { useTranslation } from "@evmosapps/i18n/client";

import { useAccount } from "wagmi";
import { TopupModalTrigger } from "stateful-components/src/modals/TopupModal/TopupModal";

import { PrimaryButton } from "@evmosapps/ui-helpers";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { trpc } from "@evmosapps/trpc/client";

import { Address } from "helpers/src/crypto/addresses/types";
import { Suspense } from "react";
import { fromAtto } from "helpers/src/crypto/numbers/from-atto";
import { formatFiat } from "helpers/src/format/format-fiat";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils";

const useTotalBalance = (address: Address) => {
  const chainRef = useEvmosChainRef();

  const [[balance, rewards, staked]] = trpc.useSuspenseQueries((t) => [
    t.account.balance.byDenom({
      address,
      denom: "EVMOS",
      chainRef,
    }),

    t.account.balance.rewards.evmos({
      address,
      chainRef,
    }),

    t.account.balance.staked.evmos({
      address,
      chainRef,
    }),
  ]);

  const total = balance.balance.total + rewards.total + staked.total;

  return {
    totalUsd:
      fromAtto(total, balance.decimals) * (balance.price?.usd.price ?? 0),
    total: formatUnits(total, balance.decimals, 0),
  };
};

const TotalUsd = ({ address }: { address: Address }) => {
  const { totalUsd } = useTotalBalance(address);
  return formatFiat(totalUsd);
};
const TotalEvmos = ({ address }: { address: Address }) => {
  const { total } = useTotalBalance(address);
  return total;
};

export const AccountBalance = () => {
  const { isConnected, address } = useAccount();

  const { t } = useTranslation("dappStore");

  return (
    <section className="text-left md:mx-0">
      <p className="mb-2 text-lg text-[#E8DFD3] md:text-2xl">
        {t("account.balance.title")}
      </p>
      <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 ">
        <div>
          <h6 className="text-3xl font-bold text-white md:text-5xl flex items-center ">
            <Suspense
              fallback={
                <span className="bg-white/5 w-16 h-[0.8lh] animate-pulse rounded-lg "></span>
              }
            >
              {address && <TotalEvmos address={address} />}
            </Suspense>
            {!address && "-"}
            <span className="ml-2 text-3xl font-bold uppercase text-white opacity-50 md:text-5xl">
              EVMOS
            </span>
          </h6>
          <p className="mt-4 text-lg flex text-white opacity-50">
            {!address && "-"}
            <Suspense
              fallback={
                <span className="bg-white/5 w-16 h-[0.8lh] animate-pulse rounded-lg "></span>
              }
            >
              {address && <TotalUsd address={address} />}
            </Suspense>
          </p>
        </div>

        {isConnected && (
          <div className="md:relative md:left-[16px] md:top-[1px] ">
            <TopupModalTrigger>
              <PrimaryButton>{t("account.balance.topUp")}</PrimaryButton>
            </TopupModalTrigger>
          </div>
        )}
      </div>
    </section>
  );
};
