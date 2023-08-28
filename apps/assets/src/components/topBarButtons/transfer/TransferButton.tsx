// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TransferIcon } from "icons";
import { useEffect, useState } from "react";
import { ModalWithTransitions, PrimaryButton } from "ui-helpers";
import { TransferModal } from "./Modal";
import { getTransferModalState } from "./utils";
import { useAccount } from "wagmi";
import { CancelModalTransfer } from "./CloseModal";
import { useTranslation } from "next-i18next";

export const TransferButton = () => {
  const handleOnClick = () => {
    setShowModal(true);
  };

  const { isDisconnected } = useAccount();

  const [showModal, setShowModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  useEffect(() => {
    const reload = getTransferModalState().reloadKeplr;
    if (reload) {
      setShowModal(true);
    }
  }, [setShowModal]);

  const { t } = useTranslation();
  return (
    <>
      <CancelModalTransfer
        showCloseModal={showCloseModal}
        setShowCloseModal={setShowCloseModal}
        setShowModal={setShowModal}
      />
      <PrimaryButton
        disabled={isDisconnected}
        //  || wallet.extensionName === METAMASK_KEY ||
        //   wallet.extensionName === WALLECT_CONNECT_KEY

        icon={<TransferIcon />}
        onClick={handleOnClick}
      >
        {/* // add i18 */}
        <p>{t("transfer.button")}</p>
      </PrimaryButton>
      <ModalWithTransitions
        show={showModal}
        setShow={setShowModal}
        propClose={true}
        handleCloseAction={setShowCloseModal}
      >
        <TransferModal />
      </ModalWithTransitions>
    </>
  );
};
