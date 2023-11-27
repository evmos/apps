import { ConfirmButton, Modal } from "@evmosapps/ui-helpers";
import { SearchVesting } from "./SearchVesting";
import { useSelector } from "react-redux";
import { StoreType } from "@evmosapps/evmos-wallet";
import { useState } from "react";
import { FundVestingAccount } from "./FundVestingAccount";
import { EnableVestingModal } from "./EnableVestingModal";
import { useTranslation } from "next-i18next";
import ApproveFunding from "./ApproveFunding";

export const Header = () => {
  const handleConfirmClick = () => {
    // TODO: open modal for creating vesting account
    setIsOpenModal(true);

    setModalContent(<FundVestingAccount />);
  };

  const value = useSelector((state: StoreType) => state.wallet.value);
  const [showModal, setShowModal] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  const { t } = useTranslation();
  return (
    <header className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-end lg:space-x-2 lg:space-y-0">
      <div className="flex flex-col md:flex-row w-full justify-between space-y-3 md:space-y-0">
        <div className="flex gap-5">
          <ConfirmButton
            className="w-fit normal-case"
            text={t("enable.header.button.title")}
            onClick={() => {
              setIsOpenEnableModal(true);
            }}
            disabled={!value.active}
          />
          <ConfirmButton
            className="w-fit normal-case"
            text={t("approve.header.button.title")}
            onClick={() => {
              setShowApproveModal(true);
            }}
            disabled={!value.active}
          />
          <ConfirmButton
            className="w-fit normal-case"
            text={t("fund.header.button.title")}
            onClick={handleConfirmClick}
            disabled={!value.active}
          />
        </div>
        <SearchVesting />
      </div>

      <Modal
        isOpen={showEnableModal}
        onClose={() => {
          setIsOpenEnableModal(false);
        }}
      >
        <EnableVestingModal
          onClose={() => {
            setShowEnableModal(false);
          }}
        />
      </Modal>

      <Modal
        show={showApproveModal}
        onClose={() => {
          setShowApproveModal(false);
        }}
      >
        <ApproveFunding
          onClose={() => {
            setShowApproveModal(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      >
        {modalContent}
      </Modal>
    </header>
  );
};
