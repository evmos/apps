"use client";
import { EvmosCopilotWhiteIcon } from "icons";
import { useCosmosQuery } from "@evmosapps/evmos-wallet/src/api/cosmos-clients/client";
import { useAccount } from "wagmi";
import { normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { cn } from "helpers";
import { ComponentProps } from "react";

import { SetupAccountModalButton } from "stateful-components/src/modals/SetupAccountModal/SetupAccountModal";
import { Link, useTranslation } from "@evmosapps/i18n/client";
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
    "rounded px-6 py-3 text-sm font-bold transition-all duration-200 ease-in-out text-red bg-pearl hover:brightness-90";
  return (
    <div className="bg-red flex flex-col justify-start space-y-3 rounded-lg bg-[url(/evmos_bg.png)] bg-contain bg-center bg-no-repeat p-8">
      <div className="flex  items-start justify-between">
        <h1 className="text-pearl text-2xl font-bold">
          {t("copilotCard.title")}
        </h1>
        <EvmosCopilotWhiteIcon width={"50"} height={"50"} />
      </div>
      <ol className="mt-4 space-y-4 md:mt-0">
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
        {/* w-fit rounded px-6 py-3 text-sm font-bold transition-all duration-200 ease-in-out text-red bg-pearl hover:bg-[#e3d6c3] active:bg-[#ccc0af] } */}
        {setupAccountActive && (
          <SetupAccountModalButton className={linkCn}>
            {t("copilotCard.letsGo")}
          </SetupAccountModalButton>
        )}
        {topupAccountActive && (
          <SetupAccountModalButton
            className={linkCn}
            initialState={{
              step: "intro-topup",
            }}
          >
            {t("copilotCard.topUp")}
          </SetupAccountModalButton>
        )}
        {nextStepsActive && (
          <>
            <Link className={linkCn} href={"/staking"}>
              {t("copilotCard.staking")}
            </Link>
            <Link
              className={cn(linkCn, "bg-white/10 text-pearl")}
              href={"/dapps"}
            >
              {t("copilotCard.useADapp")}
            </Link>
          </>
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
      "flex gap-x-3 items-center font-medium",
      "before:w-2 before:h-2 before:block before:bg-white before:rounded-full",
      {
        "before:ring-4 before:ring-white/40": active,
        "opacity-90": !completed && !active,
      },
      className
    )}
    {...rest}
  />
);
