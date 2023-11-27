// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector, useDispatch } from "react-redux";
import {
  snackWarningLedger,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
  StoreType,
} from "@evmosapps/evmos-wallet";
import { ConfirmButton } from "@evmosapps/ui-helpers";
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
        className="w-auto px-4 py-3 text-sm"
        text="Deposit"
        onClick={() => {
          actionsProps.setIsOpen(true);
          actionsProps.setModalContent(
            <DepositSTR
              data={actionsProps.tableData}
              feeBalance={actionsProps.tableData.feeBalance}
              address={wallet.evmosAddressCosmosFormat}
              setIsOpen={actionsProps.setIsOpen}
            />
          );
        }}
      />
      <ConfirmButton
        disabled={!wallet.active}
        className="w-auto px-4 py-3 text-sm"
        text="Withdraw"
        onClick={() => {
          if (wallet.evmosAddressCosmosFormat !== "") {
            actionsProps.setIsOpen(true);
            actionsProps.setModalContent(
              <WithdrawSTR
                data={actionsProps.tableData}
                feeBalance={actionsProps.tableData.feeBalance}
                address={wallet.evmosAddressCosmosFormat}
                setIsOpen={actionsProps.setIsOpen}
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
