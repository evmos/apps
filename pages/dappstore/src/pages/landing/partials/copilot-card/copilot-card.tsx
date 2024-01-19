// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useCosmosQuery } from "@evmosapps/evmos-wallet/src/api/cosmos-clients/client";
import { useAccount } from "wagmi";
import { normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { cn } from "helpers";
import { ComponentProps } from "react";
import { SetupAccountModalTrigger } from "stateful-components/src/modals/SetupAccountModal/SetupAccountModal";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { CLICK_ON_COPILOT_BANNER, sendEvent } from "tracker";
import { Frameline } from "@evmosapps/ui-helpers/src/container/FrameLine";
import { TrackerEvent } from "@evmosapps/ui-helpers/src/TrackerEvent";
export const CopilotCard = () => {
  const { address, isConnected } = useAccount();
  const { t } = useTranslation("dappStore");

  const { data: balance = 0n } = useCosmosQuery("evmos", {
    route: "/cosmos/bank/v1beta1/balances/{address}/by_denom",
    path: {
      address: address && normalizeToEvmos(address),
    },
    query: {
      denom: "aevmos",
    },
    select(data) {
      return BigInt(data.balance?.amount ?? "0");
    },
    enabled: !!address,
  });

  const { data: sequence } = useCosmosQuery("evmos", {
    route: "/cosmos/auth/v1beta1/account_info/{address}",
    path: {
      address: address && normalizeToEvmos(address),
    },
    select(data) {
      return BigInt(data.info?.sequence ?? "0");
    },
    queryOptions: {
      gcTime: Infinity,
      staleTime: Infinity,
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
              <button
                onClick={() => {
                  sendEvent(CLICK_ON_COPILOT_BANNER, {
                    "Copilot Actions": "Let's go",
                  });
                }}
                className={`${linkCn} bg-red-300`}
              >
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
              <button
                onClick={() => {
                  sendEvent(CLICK_ON_COPILOT_BANNER, {
                    "Copilot Actions": "Top up account",
                  });
                }}
                className={linkCn}
              >
                {t("copilotCard.topUp")}
              </button>
            </SetupAccountModalTrigger>
          </Frameline>
        )}
        {nextStepsActive && (
          <div className="space-x-4">
            <TrackerEvent
              event={CLICK_ON_COPILOT_BANNER}
              properties={{
                "Copilot Actions": "Stake",
              }}
            >
              <Link
                className={cn(linkCn, "text-sm py-3 rounded-lg bg-pearl/20")}
                href={"/staking"}
              >
                {t("copilotCard.staking")}
              </Link>
            </TrackerEvent>
            <TrackerEvent
              event={CLICK_ON_COPILOT_BANNER}
              properties={{
                "Copilot Actions": "Use a dApp",
              }}
            >
              <Link
                className={cn(
                  linkCn,
                  "text-sm py-3 rounded-lg bg-pearl/10 text-pearl"
                )}
                href={"/dapps/instant-dapps"}
              >
                {t("copilotCard.useADapp")}
              </Link>
            </TrackerEvent>
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
      className
    )}
    {...rest}
  />
);
