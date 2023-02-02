import { ethToEvmos } from "@evmos/address-converter";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import { useDispatch, useSelector } from "react-redux";
import { executeDeposit } from "../../../../../internal/asset/functionality/transactions/deposit";
import { BROADCASTED_NOTIFICATIONS } from "../../../../../internal/asset/functionality/transactions/errors";
import { IBCChainParams } from "../../../../../internal/asset/functionality/transactions/types";
import {
  snackbarExecutedTx,
  snackbarIncludedInBlock,
  snackbarWaitingBroadcast,
} from "../../../../../internal/asset/style/format";
import {
  snackExecuteIBCTransfer,
  snackIBCInformation,
  snackRequestRejected,
} from "../../../../../internal/asset/style/snackbars";
import { getKeplrAddressByChain } from "../../../../../internal/wallet/functionality/keplr/keplrHelpers";
import { EVMOS_SYMBOL } from "../../../../../internal/wallet/functionality/networkConfig";
import { StoreType } from "../../../../../redux/Store";
import { DepositProps } from "../types";

export const useDeposit = (useDepositProps: DepositProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  const handleConfirmButton = async () => {
    useDepositProps.setConfirmClicked(true);
    if (wallet.osmosisPubkey === null) {
      dispatch(snackRequestRejected());
      useDepositProps.setShow(false);
      return;
    }
    if (useDepositProps.token === undefined) {
      return;
    }

    const amount = parseUnits(
      useDepositProps.inputValue,
      BigNumber.from(useDepositProps.token.decimals)
    );
    if (
      useDepositProps.inputValue === undefined ||
      useDepositProps.inputValue === null ||
      useDepositProps.inputValue === "" ||
      useDepositProps.receiverAddress === undefined ||
      useDepositProps.receiverAddress === null ||
      useDepositProps.receiverAddress === "" ||
      amount.gt(useDepositProps.balance)
    ) {
      return;
    }

    const keplrAddress = await getKeplrAddressByChain(
      useDepositProps.token.chainId
    );
    if (keplrAddress === null) {
      return;
    }

    let addressEvmos = useDepositProps.receiverAddress;
    if (useDepositProps.receiverAddress.startsWith("0x")) {
      addressEvmos = ethToEvmos(useDepositProps.receiverAddress);
    }
    const params: IBCChainParams = {
      sender: keplrAddress,
      receiver: addressEvmos,
      amount: amount.toString(),
      srcChain: useDepositProps.token.chainIdentifier,
      dstChain: EVMOS_SYMBOL,
      token: useDepositProps.token.symbol,
    };
    useDepositProps.setDisabled(true);

    dispatch(snackIBCInformation());
    // create, sign and broadcast tx
    const res = await executeDeposit(
      wallet.osmosisPubkey,
      keplrAddress,
      params,
      useDepositProps.token.chainIdentifier.toUpperCase(),
      wallet.extensionName,
      useDepositProps.token.prefix
    );

    dispatch(snackExecuteIBCTransfer(res));
    useDepositProps.setShow(false);
    // check if tx is executed
    if (res.title === BROADCASTED_NOTIFICATIONS.SuccessTitle) {
      dispatch(snackbarWaitingBroadcast());
      dispatch(
        await snackbarIncludedInBlock(
          res.txHash,
          useDepositProps.token.chainIdentifier.toUpperCase(),
          res.explorerTxUrl
        )
      );

      dispatch(
        await snackbarExecutedTx(
          res.txHash,
          useDepositProps.token.chainIdentifier.toUpperCase()
        )
      );
    }
  };

  return { handleConfirmButton };
};
