// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TopupEntryStep, TopupFundStep } from "./steps";

import { useTranslation } from "@evmosapps/i18n/client";
import { Copilot } from "../copilot";

export const TopupFlow = () => {
  const { t } = useTranslation("copilot-topup");

  return (
    <Copilot flowId="topup">
      <Copilot.Header
        title={t("header.title")}
        description={t("header.description")}
      />
      <Copilot.Steps>
        <Copilot.StepItem id="intro">
          <TopupEntryStep />
        </Copilot.StepItem>
        <Copilot.StepItem id="fiat-topup">
          <TopupFundStep />
        </Copilot.StepItem>
        <Copilot.StepItem id="crypto-topup">
          <TopupFundStep />
        </Copilot.StepItem>
      </Copilot.Steps>
    </Copilot>
  );
};
