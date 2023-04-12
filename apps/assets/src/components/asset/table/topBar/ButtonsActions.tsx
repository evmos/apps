import { useSelector, useDispatch } from "react-redux";
import {
  snackWarningLedger,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
  StoreType,
} from "evmos-wallet";
import { ConfirmButton } from "confirm-button";
import DepositSTR from "../../modals/transactions/DepositSTR";
import WithdrawSTR from "../../modals/transactions/WithdrawSTR";
import { actionsProps } from "./types";

const ButtonsActions = ({ actionsProps }: { actionsProps: actionsProps }) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center space-x-2 lg:justify-end">
      <ConfirmButton
        disabled={
          !wallet.active ||
          wallet.extensionName === METAMASK_KEY ||
          wallet.extensionName === WALLECT_CONNECT_KEY
        }
        className="w-auto py-3 px-4 text-sm"
        text="Deposit"
        onClick={() => {
          actionsProps.setShow(true);
          actionsProps.setModalContent(
            <DepositSTR
              data={actionsProps.tableData}
              feeBalance={actionsProps.tableData.feeBalance}
              address={wallet.evmosAddressCosmosFormat}
              setShow={actionsProps.setShow}
            />
          );
        }}
      />
      <ConfirmButton
        disabled={!wallet.active}
        className="w-auto py-3 px-4 text-sm"
        text="Withdraw"
        onClick={() => {
          if (wallet.evmosAddressCosmosFormat !== "") {
            actionsProps.setShow(true);
            actionsProps.setModalContent(
              <WithdrawSTR
                data={actionsProps.tableData}
                feeBalance={actionsProps.tableData.feeBalance}
                address={wallet.evmosAddressCosmosFormat}
                setShow={actionsProps.setShow}
              />
            );
          } else {
            dispatch(snackWarningLedger());
          }
        }}
      />
    </div>
  );
};

export default ButtonsActions;
