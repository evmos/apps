import { BigNumber } from "ethers";
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
            values={{
              token: modalValues.token,
              tokenTo: "EVMOS",
              address: modalValues.address,
              amount: modalValues.amount,
              title: modalValues.title,
              network: modalValues.network,
              imgFrom: `/tokens/${modalValues.token.toLowerCase()}.png`,
              imgTo: `/tokens/evmos.png`,
              fee: modalValues.fee,
              feeDenom: "EVMOS",
              decimals: modalValues.decimals,
              erc20Balance: BigNumber.from("0"),
              feeBalance: modalValues.feeBalance,
            }}
          />
        )}
        {modalValues.title.toUpperCase() === ModalsTypes.WITHDRAW && (
          <Withdraw
            values={{
              token: "EVMOS",
              tokenTo: modalValues.token,
              address: modalValues.address,
              amount: modalValues.amount,
              title: modalValues.title,
              network: modalValues.network,
              fee: modalValues.fee,
              feeDenom: "EVMOS",
              imgFrom: `/tokens/evmos.png`,
              imgTo: `/tokens/${modalValues.token.toLowerCase()}.png`,
              decimals: modalValues.decimals,
              erc20Balance: BigNumber.from("0"),
              feeBalance: modalValues.feeBalance,
            }}
          />
        )}
        {modalValues.title.toUpperCase() === ModalsTypes.CONVERT && (
          <Convert
            values={{
              token: modalValues.token,
              tokenTo: modalValues.token,
              address: modalValues.address,
              amount: modalValues.amount,
              title: modalValues.title,
              network: modalValues.network,
              imgFrom: `/tokens/${modalValues.token.toLowerCase()}.png`,
              imgTo: `/tokens/${modalValues.token.toLowerCase()}.png`,
              fee: modalValues.fee,
              feeDenom: modalValues.feeDenom,
              decimals: modalValues.decimals,
              erc20Balance: modalValues.erc20Balance,
              feeBalance: modalValues.feeBalance,
            }}
          />
        )}
      </>
    </Modal>
  );
};

export default ModalAsset;
