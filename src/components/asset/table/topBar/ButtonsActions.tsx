import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { TableData } from "../../../../internal/asset/functionality/table/normalizeData";
import {
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
} from "../../../../internal/wallet/functionality/wallet";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import Withdraw2 from "../../modals/transactions/Withdraw2";

type actionsProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
  tableData: TableData;
};

const ButtonsActions = ({ actionsProps }: { actionsProps: actionsProps }) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  return (
    <div className="flex items-center justify-center sm:justify-end space-x-2">
      <ConfirmButton
        disabled={
          !wallet.active ||
          wallet.extensionName === METAMASK_KEY ||
          wallet.extensionName === WALLECT_CONNECT_KEY
        }
        className="text-sm w-auto py-3 px-4"
        text="Deposit"
        onClick={() => {
          console.log("asd");
        }}
      />
      <ConfirmButton
        disabled={!wallet.active}
        className="text-sm w-auto py-3 px-4"
        text="Withdraw"
        onClick={() => {
          actionsProps.setShow(true);
          actionsProps.setModalContent(
            <Withdraw2
              data={actionsProps.tableData}
              //   item={actionsProps.item}
              feeBalance={actionsProps.tableData.feeBalance}
              address={wallet.evmosAddressCosmosFormat}
              setShow={actionsProps.setShow}
            />
          );
        }}
      />
    </div>
  );
};

export default ButtonsActions;
