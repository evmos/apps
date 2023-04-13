import { Modal } from "modal";

const ModalAsset = ({
  show,
  close,
  modalContent,
}: {
  show: boolean;
  modalContent: JSX.Element;
  close: () => void;
}) => {
  return (
    <Modal show={show} onClose={close}>
      {modalContent}
    </Modal>
  );
};

export default ModalAsset;
