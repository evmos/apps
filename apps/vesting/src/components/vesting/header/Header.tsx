import { ConfirmButton, Modal } from "ui-helpers";
import { SearchVesting } from "./SearchVesting";
import { useSelector } from "react-redux";
import { KEPLR_KEY, StoreType } from "evmos-wallet";
import { useState } from "react";
import { CreateAccountModal } from "./CreateAccountModal";
export const Header = () => {
  const handleConfirmClick = () => {
    // TODO: open modal for creating vesting account
    setShowModal(true);
    setModalContent(<CreateAccountModal />);
  };

  const value = useSelector((state: StoreType) => state.wallet.value);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  return (
    <header className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-end lg:space-y-0 lg:space-x-2">
      <SearchVesting />
      <ConfirmButton
        className="w-fit"
        text="Create vesting account"
        onClick={handleConfirmClick}
        disabled={!value.active || value.extensionName === KEPLR_KEY}
      />
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        {modalContent}
      </Modal>
    </header>
  );
};
