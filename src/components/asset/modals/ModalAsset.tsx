import Modal from "../../common/Modal";
import { ModalsTypes } from "./constants";
import Convert from "./transactions/Convert";
import Deposit from "./transactions/Deposit";
import Withdraw from "./transactions/Withdraw";
import { DataModal } from "./types";

const ModalAsset = ({
  show,
  modalValues,
  close,
}: {
  show: boolean;
  modalValues: DataModal;
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
            tokenTo="EVMOS"
            address={modalValues.address}
            amount={modalValues.amount}
            title={modalValues.title}
            network={modalValues.network}
            imgFrom={`/tokens/${modalValues.token.toLowerCase()}.png`}
            imgTo={`/tokens/evmos.png`}
            fee={modalValues.fee}
            feeDenom="EVMOS"
            decimals={modalValues.decimals}
          />
        )}
        {modalValues.title.toUpperCase() === ModalsTypes.WITHDRAW && (
          <Withdraw
            token="EVMOS"
            tokenTo={modalValues.token}
            address={modalValues.address}
            amount={modalValues.amount}
            title={modalValues.title}
            network={modalValues.network}
            fee={modalValues.fee}
            feeDenom="EVMOS"
            imgFrom={`/tokens/evmos.png`}
            imgTo={`/tokens/${modalValues.token.toLowerCase()}.png`}
            decimals={modalValues.decimals}
            pubkey={modalValues.pubkey}
          />
        )}
        {modalValues.title.toUpperCase() === ModalsTypes.CONVERT && (
          <Convert
            token={modalValues.token}
            address={modalValues.address}
            amount={modalValues.amount}
            title={modalValues.title}
            network={modalValues.network}
            imgFrom={`/tokens/${modalValues.token.toLowerCase()}.png`}
            imgTo={`/tokens/${modalValues.token.toLowerCase()}.png`}
            fee={modalValues.fee}
            feeDenom={modalValues.feeDenom}
            decimals={modalValues.decimals}
            erc20Balance={modalValues.erc20Balance}
          />
        )}
      </>
    </Modal>
  );
};

export default ModalAsset;
