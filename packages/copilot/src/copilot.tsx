// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Title, Description } from "@evmosapps/ui-helpers";
import { useModal } from "@evmosapps/ui-helpers/src/Modal";
import { cn, raise, useEffectEvent } from "helpers";
import { CloseIcon } from "@evmosapps/icons/CloseIcon";
import { EvmosRedIcon } from "@evmosapps/icons/EvmosRedIcon";
import { get, omit } from "lodash-es";
import {
  ComponentProps,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type CopilotProps = {
  flowId?: string;
  activeStep: string;
  setActiveStep: (step: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  isCompleted: boolean;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  setIsCompleted: (isCompleted: boolean) => void;

  steps: {
    id: string;
    isActive: boolean;
    isCompleted: boolean;
  }[];
  _init: (steps: [string, ...string[]]) => void;
};
export const CopilotContext = createContext<CopilotProps | null>(null);

export function Copilot({
  children,
  initialStepId,
  flowId,
  onStepChange,
}: PropsWithChildren<{
  initialStepId?: string;
  flowId?: string;
  onStepChange?: (stepId: string) => void;
}>) {
  const [stepIds, setSteps] = useState<[string, ...string[]]>([
    "not-initialized",
  ]);

  const [activeStep, setActiveStep] = useState<string>(
    initialStepId ?? stepIds[0],
  );

  useLayoutEffect(() => {
    if (activeStep !== "not-initialized") return;
    setActiveStep(stepIds[0]);
  }, [activeStep, stepIds]);

  useEffect(() => {
    if (activeStep === "not-initialized") return;

    onStepChange?.(activeStep);
  }, [activeStep, onStepChange]);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeStepIndex = stepIds.indexOf(activeStep);

  const nextStep = useEffectEvent(() => {
    const nextStepId = stepIds[activeStepIndex + 1];
    if (!nextStepId) return;
    setActiveStep(nextStepId);
  });

  const prevStep = useEffectEvent(() => {
    const prevStepIndex = activeStepIndex;
    const prevStepId = stepIds[prevStepIndex - 1];
    if (!prevStepId) return;
    setActiveStep(prevStepId);
  });

  const steps = stepIds.map((id, i) => ({
    id,
    isActive: id === activeStep,
    isCompleted: i < activeStepIndex,
  }));

  return (
    <CopilotContext.Provider
      value={{
        flowId,
        nextStep,
        prevStep,
        setIsCompleted,
        isCompleted,
        activeStep,
        setActiveStep,
        hasNextStep: activeStepIndex < stepIds.length - 1,
        hasPrevStep: activeStepIndex > 0,
        steps,

        _init: (steps) => {
          setSteps(steps);
        },
      }}
    >
      <div className="divide-strokeGrey text-gray1 grid grid-rows-1 divide-y md:grid-cols-3 md:grid-rows-none md:divide-x md:divide-y-0">
        {children}
      </div>
    </CopilotContext.Provider>
  );
}

export const useCopilot = () => {
  return omit(useContext(CopilotContext) ?? raise("CopilotContext not found"), [
    "_init",
  ]);
};

const CopilotStep = ({
  children,
}: PropsWithChildren<{
  id: string;
}>) => {
  return <>{children}</>;
};
Copilot.StepItem = CopilotStep;

const CopilotSteps = ({
  children,
  header,
}: {
  children: [JSX.Element, ...JSX.Element[]];
  header?: React.ReactElement;
}) => {
  const { _init, activeStep } =
    useContext(CopilotContext) ?? raise("CopilotContext not found");
  const init = useEffectEvent(() => {
    const stepIds = children.map((child) => {
      const id: unknown = get(child, "props.id");
      if (!id || typeof id !== "string")
        throw new Error("Copilot step must have an id");
      return id;
    }) as [string, ...string[]];

    // sanity check for step ids
    if (new Set(stepIds).size !== stepIds.length)
      raise("Copilot step ids must be unique");
    _init(stepIds);
  });
  useLayoutEffect(() => {
    init();
  }, [init]);
  return (
    <section className="bg-white px-4 pb-4 pt-5 sm:p-6 md:col-span-2 md:px-8">
      {header}
      {children.map((child) => {
        if (get(child, "props.id") === activeStep) return child;
        return null;
      })}
    </section>
  );
};

Copilot.Steps = CopilotSteps;

const CopilotHeader = ({
  title,
  description,

  icon,
  children,
}: PropsWithChildren<{
  title: string;
  description: string | JSX.Element;

  icon?: JSX.Element;
}>) => {
  return (
    <header className="flex flex-col space-y-3 text-gray1 h-full justify-between px-4 pb-4 pt-5 sm:p-6">
      <div className="justify-start space-y-1">
        {icon ? icon : <EvmosRedIcon height={60} />}
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
      {children && (
        <div className="flex flex-col space-y-2 text-xxs h-full justify-end">
          {children}
        </div>
      )}
    </header>
  );
};

Copilot.Header = CopilotHeader;

const CopilotStepHeader = ({
  children,
  className,

  ...rest
}: ComponentProps<"div">) => {
  const { setIsOpen } = useModal();
  return (
    <div
      className={cn("flex justify-between items-center", className)}
      {...rest}
    >
      <div className="flex items-center">{children}</div>
      <button
        className="cursor-pointer ml-auto"
        onClick={() => setIsOpen(false)}
      >
        <CloseIcon
          className={cn("h-6 w-auto text-current")}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

Copilot.StepHeader = CopilotStepHeader;
