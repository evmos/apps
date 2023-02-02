import { useState } from "react";
import { ModalTitle } from "../../../common/Modal";
import FromWithdraw from "../common/withdraw/FromWithdraw";
import AmountWithdraw from "../common/withdraw/AmountWithdraw";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import ConfirmButton from "../../../common/ConfirmButton";
import ToWithdraw from "../common/withdraw/ToWithdraw";
import RedirectLink from "../common/RedirectLink";
import { ButtonActionsProps } from "./types";
import { useWithdraw } from "./hooks/useWithdraw";

const WithdrawSTR = ({
  data,
  feeBalance,
  address,
  setShow,
}: ButtonActionsProps) => {
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState<TableDataElement>();

  const useWithdrawProps = {
    setConfirmClicked,
    setShow,
    token,
    inputValue,
    receiverAddress,
    address,
    setDisabled,
    feeBalance,
  };

  const { handleConfirmButton } = useWithdraw(useWithdrawProps);

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

export default WithdrawSTR;
