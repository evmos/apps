import { BigNumber } from "@ethersproject/bignumber";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../../../redux/Store";
import { ModalTitle } from "../../../common/Modal";
import { BROADCASTED_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import FromWithdraw from "../common/FromWithdraw";
import AmountWithdraw from "../common/AmountWithdraw";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import ConfirmButton from "../../../common/ConfirmButton";
import ToWithdraw from "../common/ToWithdraw";
import {
  snackExecuteIBCTransfer,
  snackIBCInformation,
  snackRequestRejected,
} from "../../../../internal/asset/style/snackbars";
import { parseUnits } from "ethers/lib/utils.js";
import { IBCChainParams } from "../../../../internal/asset/functionality/transactions/types";
import { executeWithdraw } from "../../../../internal/asset/functionality/transactions/withdraw";
import {
  snackbarWaitingBroadcast,
  snackbarIncludedInBlock,
  snackbarExecutedTx,
} from "../../../../internal/asset/style/format";
import RedirectLink from "../common/RedirectLink";
import { ButtonActionsProps } from "./types";

const Withdraw2 = ({
  data,
  feeBalance,
  address,
  setShow,
}: ButtonActionsProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const [token, setToken] = useState<TableDataElement>();

  const handleConfirmButton = async () => {
    setConfirmClicked(true);
    if (wallet.evmosPubkey === null) {
      dispatch(snackRequestRejected());
      setShow(false);
      return;
    }
    // avoid withdraw if token is not selected
    if (token === undefined) {
      return;
    }

    if (
      inputValue === undefined ||
      inputValue === null ||
      inputValue === "" ||
      inputValue === "0" ||
      receiverAddress === undefined ||
      receiverAddress === null ||
      receiverAddress === ""
    ) {
      return;
    }
    const amount = parseUnits(inputValue, BigNumber.from(token.decimals));

    if (amount.gt(token.erc20Balance)) {
      return;
    }

    const params: IBCChainParams = {
      sender: address,
      receiver: receiverAddress,
      amount: amount.toString(),
      srcChain: EVMOS_SYMBOL,
      dstChain: token.chainIdentifier,
      token: token.symbol,
    };
    setDisabled(true);

    dispatch(snackIBCInformation());
    // create, sign and broadcast tx
    const res = await executeWithdraw(
      wallet.evmosPubkey,
      wallet.evmosAddressCosmosFormat,
      params,
      feeBalance,
      wallet.extensionName,
      token.prefix
    );

    dispatch(snackExecuteIBCTransfer(res));
    setShow(false);
    // check if tx is executed
    if (res.title === BROADCASTED_NOTIFICATIONS.SuccessTitle) {
      dispatch(snackbarWaitingBroadcast());
      dispatch(
        await snackbarIncludedInBlock(
          res.txHash,
          EVMOS_SYMBOL,
          res.explorerTxUrl
        )
      );
      dispatch(await snackbarExecutedTx(res.txHash, EVMOS_SYMBOL));
    }
  };

  const amountProps = {
    data: data,
    setToken: setToken,
    token: token,
    value: inputValue,
    setValue: setInputValue,
    confirmClicked: confirmClicked,
    setReceiverAddress: setReceiverAddress,
  };

  return (
    <>
      <ModalTitle title="Withdraw Tokens" />
      <div className="text-darkGray3 space-y-3">
        <FromWithdraw address={address} />
        <AmountWithdraw amountProps={amountProps} />
        {token === undefined || token.handledByExternalUI === null ? (
          <ToWithdraw
            token={token}
            receiverAddress={receiverAddress}
            setReceiverAddress={setReceiverAddress}
            confirmClicked={confirmClicked}
          />
        ) : (
          ""
        )}
        {token !== undefined && token.handledByExternalUI !== null ? (
          <RedirectLink
            href={token.handledByExternalUI.url}
            text="Withdraw from Axelar"
          />
        ) : (
          <ConfirmButton
            disabled={disabled}
            text="WITHDRAW"
            onClick={handleConfirmButton}
          />
        )}
      </div>
    </>
  );
};

export default Withdraw2;
