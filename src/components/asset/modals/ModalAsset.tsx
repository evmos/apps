import Modal from "../../common/Modal";
import { DataModalType } from "../AssetsTable";
import Convert from "./Convert";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

const ModalsTypes = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
  CONVERT: "CONVERT",
} as const;

const ModalAsset = ({
  show,
  modalValues,
  close,
}: {
  show: boolean;
  modalValues: DataModalType;
  close: () => void;
}) => {
  return (
    <Modal
      title={`${modalValues.title} ${modalValues.token}`}
      show={show}
      onClose={close}
    >
      <>
        {modalValues.title.toUpperCase() === ModalsTypes.DEPOSIT && (
          <Deposit
            token={modalValues.token}
            address={modalValues.address}
            amount={modalValues.amount}
            title={modalValues.title}
            network={modalValues.network}
          />
        )}
        {modalValues.title.toUpperCase() === ModalsTypes.WITHDRAW && (
          <Withdraw
            token={modalValues.token}
            address={modalValues.address}
            amount={modalValues.amount}
            title={modalValues.title}
            network={modalValues.network}
          />
        )}
        {modalValues.title.toUpperCase() === ModalsTypes.CONVERT && (
          <Convert
            token={modalValues.token}
            address={modalValues.address}
            amount={modalValues.amount}
            title={modalValues.title}
            network={modalValues.network}
          />
        )}
      </>
    </Modal>
  );
};

export default ModalAsset;
