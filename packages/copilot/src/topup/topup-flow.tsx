import { TopupEntryStep, TopupFundStep } from "./steps";

import { EvmosCopilotIcon } from "icons";
import { useTranslation } from "@evmosapps/i18n/client";
import { Copilot } from "../copilot";

export const TopupFlow = () => {
  const { t } = useTranslation("copilot-topup");

  return (
    <Copilot flowId="topup">
      <Copilot.Header
        title={t("header.title")}
        icon={<EvmosCopilotIcon height={70} />}
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
