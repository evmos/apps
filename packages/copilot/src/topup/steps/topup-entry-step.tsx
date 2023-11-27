import { useTranslation } from "@evmosapps/i18n/client";
import { Modal } from "@evmosapps/ui-helpers";

import { OnboardOptionsMenu } from "../partials/onboard-options-menu";

export const TopupEntryStep = () => {
  const { t } = useTranslation("copilot-topup");

  return (
    <section className="flex flex-col gap-y-4">
      <Modal.Header>
        <h1 className="font-bold">{t("introStep.title")}</h1>
      </Modal.Header>
      <p className="text-gray1 text-sm mb-10">{t("introStep.body")}</p>

      <OnboardOptionsMenu />
    </section>
  );
};
