// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useAccount } from "wagmi";

import { cn, raise } from "helpers";
import { ComponentProps } from "react";
import { SetupAccountModalTrigger } from "stateful-components/src/modals/SetupAccountModal/SetupAccountModal";
import { Link, useTranslation } from "@evmosapps/i18n/client";

import { Frameline } from "@evmosapps/ui-helpers/src/container/FrameLine";

import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { useQuery } from "@tanstack/react-query";
import { cosmos } from "helpers/src/clients/cosmos";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
export const CopilotCard = () => {
  const { address, isConnected } = useAccount();
  const { t } = useTranslation("dappStore");
  const chainRef = useEvmosChainRef();

  const { data: balance = 0n } = useQuery({
    queryKey: ["balance", address, chainRef],

    queryFn: () =>
      cosmos(chainRef).GET("/cosmos/bank/v1beta1/balances/{address}/by_denom", {
        params: {
          path: {
            address: normalizeToCosmos(
              address ?? raise("address is undefined"),
            ),
          },
          query: {
            denom: "aevmos",
          },
        },
      }),

    select({ data }) {
      return BigInt(data?.balance?.amount ?? "0");
    },
    enabled: !!address,
  });

  const { data: sequence } = useQuery({
    queryKey: ["sequence", address, chainRef],

    queryFn: () =>
      cosmos(chainRef).GET("/cosmos/auth/v1beta1/account_info/{address}", {
        params: {
          path: {
            address: normalizeToCosmos(
              address ?? raise("address is undefined"),
            ),
          },
        },
      }),

    select({ data }) {
      return BigInt(data?.info?.sequence ?? "0");
    },
    enabled: !!address,
  });

  if (sequence !== undefined && sequence > 0n) {
    return null;
  }

  const setupAccountActive = !isConnected;

  const topupAccountActive = isConnected && balance === 0n;

  const nextStepsActive = isConnected && balance > 0n && sequence === 0n;
  const linkCn =
    "rounded w-full px-5 py-1 text-base font-bold transition-all duration-200 ease-in-out text-pearl bg-[#504f43] hover:brightness-90";
  return (
    <div className="text-pearl flex flex-col justify-start space-y-3 rounded-lg bg-[url(/galaxy-1.png)] bg-cover bg-center bg-no-repeat p-6">
      <hr className="text-pearl/30" />
      <h1
        className="text-4xl md:text-5xl font-bold font-evmos tracking-wider"
        style={{ wordSpacing: "-14px" }}
      >
        {t("copilotCard.title")}
      </h1>
      <h2 className="font-bold text-xl">{t("copilotCard.subtitle")}</h2>
      <ol className="pt-1 pb-3 space-y-1 md:mt-0">
        <Step active={setupAccountActive} completed={isConnected}>
          {t("copilotCard.setupYourAccount")}
        </Step>
        <Step active={topupAccountActive} completed={balance > 0n}>
          {t("copilotCard.topUpYourAccount")}
        </Step>
        <Step active={nextStepsActive} completed={!!sequence}>
          {t("copilotCard.nextSteps")}
        </Step>
      </ol>
      <div className="flex gap-x-4">
        {setupAccountActive && (
          <Frameline className="w-full p-2">
            <SetupAccountModalTrigger>
              <button className={`${linkCn} bg-red-300`}>
                {t("copilotCard.letsGo")}
              </button>
            </SetupAccountModalTrigger>
          </Frameline>
        )}
        {topupAccountActive && (
          <Frameline className="w-full p-2">
            <SetupAccountModalTrigger
              initialState={{
                step: "intro-topup",
              }}
            >
              <button className={`${linkCn} bg-red-300`}>
                {t("copilotCard.topUp")}
              </button>
            </SetupAccountModalTrigger>
          </Frameline>
        )}
        {nextStepsActive && (
          <div className="space-x-4">
            <Link
              className={cn(
                linkCn,
                "text-sm py-3 rounded-lg bg-pearl/10 text-pearl",
              )}
              href={"/dapps/instant-dapps"}
            >
              {t("copilotCard.useADapp")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Step = ({
  className,
  active,
  completed,
  ...rest
}: ComponentProps<"li"> & { active?: boolean; completed?: boolean }) => (
  <li
    className={cn(
      "flex gap-x-3 items-center font-light text-sm tracking-widest",
      "before:w-2 before:h-2 before:block before:bg-red-300 before:rounded-full",
      {
        "before:outline before:outline-red-300 before:outline-1 before:outline-offset-2 text-red-300":
          active,
        "before:bg-transparent before:border before:border-[#A4A189] before:outline before:outline-[#A4A189] before:outline-1 before:outline-offset-1  text-[#A4A189]":
          !completed && !active,
      },
      className,
    )}
    {...rest}
  />
);
