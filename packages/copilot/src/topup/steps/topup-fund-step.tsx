// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "@evmosapps/i18n/client";
import { OnboardOptionsMenu } from "../partials/onboard-options-menu";
import ProviderDropwdown from "../partials/provider-dropdown";

import { useEffect, useRef, useState } from "react";
import Transak from "@evmosapps/widgets/src/transak";
import { useAccount } from "wagmi";
import { getCosmosBalances, normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { useQuery } from "@tanstack/react-query";
import { isBigInt, useEffectEvent } from "helpers";
import { TopupSuccessMessage } from "../partials/topup-success-message";
import CypherD from "@evmosapps/widgets/src/cypherd";
import C14 from "@evmosapps/widgets/src/c14";
import Squid from "@evmosapps/widgets/src/squid";
import LayerSwap from "@evmosapps/widgets/src/layerswap";
import { Modal } from "@evmosapps/ui-helpers";
import { useCopilot } from "../../copilot";
import { providerOptions } from "../utils";
import { useClosePrompt } from "../../partials/close-prompt";
import { CLICK_ON_TOP_UP_YOUR_ACCOUNT_COPILOT, sendEvent } from "tracker";

const useWatchEvmosBalance = ({
  onBalanceChange,
}: {
  onBalanceChange: (prev: bigint, current: bigint) => void;
}) => {
  const balance = useRef(-1n);
  const { address } = useAccount();
  const { data } = useQuery({
    enabled: !!address,
    queryKey: ["watchBalance", address ?? "not-connected"],
    refetchInterval: 5000,
    queryFn: async () => {
      if (!address) throw new Error("No address");
      const balances = await getCosmosBalances({
        address: normalizeToEvmos(address),
      });

      return balances.find(({ denom }) => denom === "EVMOS")?.value ?? 0n;
    },
  });
  const _onBalanceChange = useEffectEvent(onBalanceChange);
  useEffect(() => {
    if (!isBigInt(data)) return;
    if (balance.current === -1n) balance.current = data ?? 0n;
    if (data !== balance.current) {
      _onBalanceChange(balance.current, data);
      balance.current = data ?? 0n;
    }
  }, [_onBalanceChange, data]);
};
export const TopupFundStep = () => {
  const { t } = useTranslation("copilot-topup");
  const [funded, setFunded] = useState(false);

  const { setClosePromptEnabled } = useClosePrompt();
  const { activeStep, flowId } = useCopilot();
  const options =
    activeStep === "crypto-topup"
      ? providerOptions.crypto
      : providerOptions.card;

  const [selectedProvider, setSelectedProvider] = useState<
    (typeof options)[number]
  >(options[0]);

  useWatchEvmosBalance({
    onBalanceChange: (prev, current) => {
      if (current > prev) {
        setFunded(true);
      }
    },
  });

  useEffect(() => {
    if (!funded) return;
    if (flowId !== "topup") return;
    setClosePromptEnabled(false);
  }, [flowId, funded, setClosePromptEnabled]);

  return (
    <section className="flex flex-col gap-y-4">
      <Modal.Header>
        <h1 className="font-bold text-base">{t("fiatTopupStep.title")}</h1>
      </Modal.Header>
      <OnboardOptionsMenu variant="small" />

      {funded && <TopupSuccessMessage />}

      <div className="flex items-center">
        <span className="text-sm text-[#374151] mr-auto">
          {t("fiatTopupStep.providedBy")}
        </span>

        <ProviderDropwdown
          selectedValue={selectedProvider}
          onItemClick={(option) => {
            sendEvent(CLICK_ON_TOP_UP_YOUR_ACCOUNT_COPILOT, {
              "Top Up Method": option.value,
            });
            setSelectedProvider(option);
          }}
          dropdownOptions={options}
        />
      </div>
      <div className="flex rounded-lg overflow-hidden">
        {selectedProvider.value === "Transak" && <Transak />}
        {selectedProvider.value === "C14" && <C14 />}

        {selectedProvider.value === "Cypher Wallet" && <CypherD />}
        {selectedProvider.value === "Squid" && (
          <Squid className="max-w-md w-full mx-auto" />
        )}
        {selectedProvider.value === "Layerswap" && <LayerSwap />}
      </div>
    </section>
  );
};
