import { ErrorMessage, PrimaryButton } from "@evmosapps/ui-helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { Trans } from "next-i18next";
import { useConnectModal } from "stateful-components/src/modals/ConnectModal/ConnectModal";

export const ConnectToWalletWarning = () => {
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
        }}
      >
        {t("connect.button")}
      </PrimaryButton>
    </>
  );
};
