// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTranslation } from "@evmosapps/i18n/client";
import { Modal } from "@evmosapps/ui-helpers";

import { OnboardOptionsMenu } from "../partials/onboard-options-menu";

export const TopupEntryStep = () => {
  const { t } = useTranslation("copilot-topup");

  return (
    <section className="flex flex-col gap-y-4">
      <Modal.Header>
        <h1 className="font-bold text-base">{t("introStep.title")}</h1>
      </Modal.Header>
      <p className="text-gray1 text-sm mb-5">{t("introStep.body")}</p>

      <OnboardOptionsMenu />
    </section>
  );
};
