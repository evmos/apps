// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "@evmosapps/i18n/client";
import { cn } from "helpers";
import { CreditCardsIcon } from "@evmosapps/icons/CreditCardsIcon";
import { EthereumIcon } from "@evmosapps/icons/EthereumIcon";
import { ComponentProps } from "react";
import { CheckMark } from "../../partials/check-mark";
import { useCopilot } from "../../copilot";

const OptionButton = ({
  className,
  variant,
  selected,
  children,
  ...rest
}: ComponentProps<"button"> & {
  selected?: boolean;
  variant: "small" | "large";
}) => {
  return (
    <button
      className={cn(
        " flex items-center shadow justify-center gap-2 rounded-lg transition-all duration-300 hover:shadow-md px-2 py-4",
        {
          "py-1": variant === "small",
          "ring-2 ring-red": selected,
          "border-strokeGrey border": !selected,
        },
        className,
      )}
      {...rest}
    >
      {children}
      {selected && <CheckMark />}
    </button>
  );
};
export const OnboardOptionsMenu = ({
  variant = "large",
}: {
  variant?: "small" | "large";
}) => {
  const { t } = useTranslation("copilot-topup");
  const { setActiveStep, activeStep } = useCopilot();
  return (
    <div className="grid grid-cols-1 gap-6 font-medium md:grid-cols-2 md:text-sm">
      <OptionButton
        variant={variant}
        onClick={() => setActiveStep("fiat-topup")}
        selected={activeStep === "fiat-topup"}
      >
        <CreditCardsIcon />

        {t("onboardOptions.fiat")}
      </OptionButton>

      <OptionButton
        variant={variant}
        onClick={() => setActiveStep("crypto-topup")}
        selected={activeStep === "crypto-topup"}
      >
        <EthereumIcon />

        {t("onboardOptions.crypto")}
      </OptionButton>
    </div>
  );
};
