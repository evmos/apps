import { useState } from "react";
import { useDispatch } from "react-redux";
import { MODAL_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import { snackErrorConnectingKeplr } from "../../../../internal/asset/style/snackbars";
import { getKeplrAddressByChain } from "../../../../internal/wallet/functionality/keplr/keplrHelpers";
import { truncateAddress } from "../../../../internal/wallet/style/format";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import SmallButton from "../../../common/SmallButton";
import AddTokenMetamask from "../transactions/AddTokenMetamask";
import ContainerInput from "./ContainerInput";
import { ContainerModal } from "./ContainerModal";
import ErrorMessage from "./ErrorMessage";
import { TextSmall } from "./TextSmall";
import { WithdrawReceiverProps } from "./types";

const ToWithdraw = ({
  token,
  receiverAddress,
  setReceiverAddress,
  confirmClicked,
}: WithdrawReceiverProps) => {
  const [showInput, setShowInput] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const handleOnClickEdit = () => {
    setShowInput(true);
    setShowEditButton(false);
  };
  const dispatch = useDispatch();

  return (
    <ContainerModal>
      <>
        <div className="flex items-center space-x-3">
          <TextSmall text="TO" />
          <span>{truncateAddress(receiverAddress)}</span>
          <div className="flex items-center space-x-5 w-full justify-end">
            <SmallButton
              className={`${!showEditButton ? "invisible" : ""}`}
              text="EDIT"
              onClick={handleOnClickEdit}
            />
            <KeplrIcon
              width={25}
              height={25}
              className={`cursor-pointer ${
                token === undefined ? "disabled" : ""
              }`}
              onClick={async () => {
                if (token === undefined) {
                  // It should never enters here
                  // because the button is disabled until the user
                  // selects a token
                  return;
                }
                const keplrAddress = await getKeplrAddressByChain(
                  token.chainId,
                  token.chainIdentifier
                );
                if (keplrAddress === null) {
                  dispatch(snackErrorConnectingKeplr());
                  return;
                }
                setReceiverAddress(keplrAddress);
              }}
            />
          </div>
        </div>
        {/* <div className="flex items-center justify-between"> */}
        {showInput && (
          <>
            <ContainerInput>
              <input
                className="w-full border-none hover:border-none focus-visible:outline-none"
                value={receiverAddress}
                onChange={(e) => {
                  setReceiverAddress(e.target.value);
                }}
              />
            </ContainerInput>

            <h6 className="italic text-xs font-bold">
              IMPORTANT: Transferring to an incorrect address will result in
              loss of funds.
            </h6>
          </>
        )}

        {confirmClicked && receiverAddress === "" && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAddressEmpty} />
        )}
        <div className="flex justify-end w-full">
          {token !== undefined && (
            <AddTokenMetamask
              token={{
                erc20Address: token?.erc20Address,
                symbol: token?.symbol,
                decimals: token?.decimals,
                img: token?.pngSrc,
              }}
            />
          )}
        </div>
      </>
    </ContainerModal>
  );
};

export default ToWithdraw;
