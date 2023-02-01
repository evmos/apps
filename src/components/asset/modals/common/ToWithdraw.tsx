import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
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

const ToWithdraw = ({
  tokenTo,
  addressTo,
  setAddressTo,
  confirmClicked,
}: {
  tokenTo: TableDataElement | undefined;
  addressTo: string;
  setAddressTo: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
}) => {
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
          <span>{truncateAddress(addressTo)}</span>
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
                tokenTo === undefined ? "disabled" : ""
              }`}
              onClick={async () => {
                if (tokenTo === undefined) {
                  // It should never enters here
                  // because the button is disabled until the user
                  // selects a token
                  return;
                }
                const keplrAddress = await getKeplrAddressByChain(
                  tokenTo.chainId,
                  tokenTo.chainIdentifier
                );
                if (keplrAddress === null) {
                  dispatch(snackErrorConnectingKeplr());
                  return;
                }
                setAddressTo(keplrAddress);
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
                value={addressTo}
                onChange={(e) => {
                  setAddressTo(e.target.value);
                }}
              />
            </ContainerInput>

            <h6 className="italic text-xs font-bold">
              IMPORTANT: Transferring to an incorrect address will result in
              loss of funds.
            </h6>
          </>
        )}

        {confirmClicked && addressTo === "" && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAddressEmpty} />
        )}
        <div className="flex justify-end w-full">
          {tokenTo !== undefined && (
            <AddTokenMetamask
              token={{
                erc20Address: tokenTo?.erc20Address,
                symbol: tokenTo?.symbol,
                decimals: tokenTo?.decimals,
                img: tokenTo?.pngSrc,
              }}
            />
          )}
        </div>
      </>
    </ContainerModal>
  );
};

export default ToWithdraw;
