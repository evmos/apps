import { useTranslation } from "@evmosapps/i18n/client";

import {
  CLICK_ON_DIFFERENT_CRYPTO_OPTION,
  CLICK_ON_DIFFERENT_ON_RAMP,
  sendEvent,
} from "tracker";
import { OnboardOptionsMenu } from "../partials/onboard-options-menu";
import ProviderDropwdown from "../partials/provider-dropdown";

import { useEffect, useRef, useState } from "react";
import Transak from "@evmosapps/instant-dapps/src/dapps/Transak";
import C14 from "@evmosapps/instant-dapps/src/dapps/C14";
import { useAccount } from "wagmi";
import { getCosmosBalances, normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { useQuery } from "@tanstack/react-query";
import { isBigInt } from "helpers";
import { TopupSuccessMessage } from "../partials/topup-success-message";
import CypherD from "@evmosapps/instant-dapps/src/dapps/CypherD";
import Squid from "@evmosapps/instant-dapps/src/dapps/Squid";
import LayerSwap from "@evmosapps/instant-dapps/src/dapps/Layerswap";
import { Modal } from "@evmosapps/ui-helpers";
import { useCopilot } from "../../copilot";
import { providerOptions } from "../utils";
import { useClosePrompt } from "../../partials/close-prompt";

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

  useEffect(() => {
    if (!isBigInt(data)) return;
    if (balance.current === -1n) balance.current = data ?? 0n;
    if (data !== balance.current) {
      onBalanceChange(balance.current, data);
      balance.current = data ?? 0n;
    }
  }, [data]);
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
  }, [funded]);

  return (
    <section className="flex flex-col gap-y-4">
      <Modal.Header>
        <h1 className="font-bold">{t("fiatTopupStep.title")}</h1>
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
            sendEvent(
              activeStep === "crypto-topup"
                ? CLICK_ON_DIFFERENT_CRYPTO_OPTION
                : CLICK_ON_DIFFERENT_ON_RAMP,
              {
                onRampType: option.value,
              }
            );
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
