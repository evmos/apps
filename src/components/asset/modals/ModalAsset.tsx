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

// type ModalType = {
//   token: string;
//   tokenTo: string;
//   address: string;
//   amount: string;
//   title: string;
//   network: string;
//   imgFrom: string;
//   imgTo: string;
//   pubkey: string;
// };

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
            tokenTo="EVMOS"
            address={modalValues.address}
            amount={modalValues.amount}
            title={modalValues.title}
            network={modalValues.network}
            imgFrom={`/tokens/${modalValues.token.toLowerCase()}.png`}
            imgTo={`/tokens/evmos.png`}
            fee="0.02"
            feeDenom="EVMOS"
            decimals="18"
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
            fee="0.02"
            feeDenom="EVMOS"
            imgFrom={`/tokens/evmos.png`}
            imgTo={`/tokens/${modalValues.token.toLowerCase()}.png`}
            decimals="18"
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

            // token: string;
            // address: string;
            // amount: BigNumber;
            // title: string;
            // network: string;
            // decimals: number;
            // fee: BigNumber;
            // feeDenom: string;
            // pubkey: string | null;
            // erc20Balance: BigNumber;
          />
        )}
      </>
    </Modal>
  );
};

export default ModalAsset;
