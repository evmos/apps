// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ErrorMessage, PrimaryButton } from "@evmosapps/ui-helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { Trans } from "next-i18next";
import { useConnectModal } from "stateful-components/src/modals/ConnectModal/ConnectModal";
import { PROMPTED_TO, sendEvent } from "tracker";

export const ConnectToWalletWarning = ({
  modalType,
}: {
  modalType: string;
}) => {
  const { t } = useTranslation("transfer-modal");
  const { setIsOpen } = useConnectModal();
  return (
    <>
      <ErrorMessage className="justify-center pl-0 mb-4" variant="info">
        <p className="pb-1"> {t("error.failedToGetBalance")}</p>
        <Trans
          t={t}
          i18nKey="error.checkWalletConnection"
          components={{
            strong: <span className="text-pink-300" />,
          }}
        />
      </ErrorMessage>
      <PrimaryButton
        type="submit"
        variant={"primary-lg"}
        className="mt-8"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true, {}, true);
          sendEvent(PROMPTED_TO, {
            "Prompt To": "Connect Account",
            Modal: modalType,
          });
        }}
      >
        {t("connect.button")}
      </PrimaryButton>
    </>
  );
};
