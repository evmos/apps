"use client";
import { EvmosCopilotIcon } from "icons";
import { useTranslation } from "@evmosapps/i18n/client";
import { TopupEntryStep, TopupFundStep } from "../topup/steps";
import { SetupConnectStep } from "./steps/setup-connect-step";
import { SetupAccountSuccesStep } from "./steps/setup-success-step";
import { SetupAccountNextStep } from "./steps/setup-account-next-step";
import { cn } from "helpers";
import { CheckMark } from "../partials/check-mark";
import { Copilot, useCopilot } from "../copilot";

const SetupSteps = () => {
  const { t } = useTranslation("copilot-setup-account");
  const { activeStep } = useCopilot();
  const steps = [
    {
      label: t("setupHeaderSteps.setup"),
      active: activeStep.endsWith("setup-account"),
    },
    {
      label: t("setupHeaderSteps.topup"),
      active: activeStep.endsWith("topup"),
    },
    {
      label: t("setupHeaderSteps.nextsteps"),
      active: activeStep.endsWith("next-steps"),
    },
  ];
  const activeIndex = steps.findIndex(({ active }) => active);
  return (
    <ul className="gap-y-3 flex flex-col">
      {steps.map(({ label, active }, i) => {
        const completed = i < activeIndex;
        return (
          <li
            className={cn(
              "text-lightGrey flex items-center gap-x-2 text-sm font-medium",
              {
                "text-red ": active,
              }
            )}
            key={label}
          >
            <div className="flex items-center justify-center w-6">
              {completed && <CheckMark />}
              {!completed && (
                <span
                  className={cn("bg-strokeGrey h-2 w-2 rounded-full block", {
                    "bg-red ring-4 ring-red/20": active,
                  })}
                />
              )}
            </div>
            {label}
          </li>
        );
      })}
    </ul>
  );
};
export const SetupAccountFlow = ({
  initialStepId,
  onStepChange,
}: {
  initialStepId?: string;
  onStepChange?: (stepId: string) => void;
}) => {
  const { t } = useTranslation("copilot-topup");

  return (
    <Copilot
      flowId="setup-account"
      initialStepId={initialStepId}
      onStepChange={onStepChange}
    >
      <Copilot.Header
        title={t("header.title")}
        icon={<EvmosCopilotIcon height={70} />}
        description={t("header.description")}
      >
        <SetupSteps />
      </Copilot.Header>
      <Copilot.Steps>
        <Copilot.StepItem id="intro-setup-account">
          <SetupConnectStep />
        </Copilot.StepItem>
        <Copilot.StepItem id="success-setup-account">
          <SetupAccountSuccesStep />
        </Copilot.StepItem>
        <Copilot.StepItem id="intro-topup">
          <TopupEntryStep />
        </Copilot.StepItem>
        <Copilot.StepItem id="fiat-topup">
          <TopupFundStep />
        </Copilot.StepItem>
        <Copilot.StepItem id="crypto-topup">
          <TopupFundStep />
        </Copilot.StepItem>
        <Copilot.StepItem id="next-steps">
          <SetupAccountNextStep />
        </Copilot.StepItem>
      </Copilot.Steps>
    </Copilot>
  );
};
