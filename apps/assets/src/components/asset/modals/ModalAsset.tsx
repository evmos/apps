// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Modal } from "ui-helpers";

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
