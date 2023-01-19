import { Dispatch, SetStateAction, useState } from "react";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { MODAL_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import { getKeplrAddressByChain } from "../../../../internal/wallet/functionality/keplr/keplrHelpers";
import { truncateAddress } from "../../../../internal/wallet/style/format";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import SmallButton from "../../../common/SmallButton";
import { ContainerModal } from "./ContainerModal";
import ErrorMessage from "./ErrorMessage";
import { TextSmall } from "./TextSmall";

const ToWithdraw = ({
  tokenTo,
  addressTo,
  setAddressTo,
}: {
  tokenTo: TableDataElement | undefined;
  addressTo: string;
  setAddressTo: Dispatch<SetStateAction<string>>;
}) => {
  const [showInput, setShowInput] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const handleOnClickEdit = () => {
    setShowInput(true);
    setShowEditButton(false);
  };
  return (
    <ContainerModal>
      <>
        <div className="flex items-center space-x-3">
          <TextSmall text="TO" />
          {/* TODO: add edit */}
          <span>{truncateAddress(addressTo)}</span>
          <div className="flex items-center space-x-5 w-full justify-end">
            <SmallButton
              className={`${!showEditButton ? "invisible" : ""}`}
              text="EDIT"
              onClick={handleOnClickEdit}
            />
            {/* <span className="uppercase font-bold">Autofill</span> */}
            <KeplrIcon
              width={25}
              height={25}
              className={`cursor-pointer ${
                tokenTo === undefined ? "disabled" : ""
              }`}
              onClick={async () => {
                if (tokenTo === undefined) {
                  // check if this works. It should never enters here
                  // because the button is disabled until the user
                  // selects a token
                  return;
                }
                const keplrAddress = await getKeplrAddressByChain(
                  tokenTo.chainId,
                  tokenTo.chainIdentifier
                );
                if (keplrAddress === null) {
                  // dispatch(
                  //   addSnackbar({
                  //     id: 0,
                  //     content: (
                  //       <SimpleSnackbar
                  //         title={KEPLR_NOTIFICATIONS.ErrorTitle}
                  //         text={KEPLR_NOTIFICATIONS.RequestRejectedSubtext}
                  //       />
                  //     ),
                  //     type: "error",
                  //   })
                  // );
                  return;
                }
                setAddressTo(keplrAddress);
              }}
            />
          </div>
          {/* <div className="space-y-3"> */}

          {/* 
          {confirmClicked && addressTo === "" && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAddressEmpty} />
          )} 
          */}

          {/* <AddTokenMetamask token={token} /> */}
          {/* </div> */}
        </div>
        {showInput && (
          <>
            <div className="pr-5 pl-4 flex items-center space-x-3 bg-white hover:border-darkGray5 focus-visible:border-darkGray5 focus-within:border-darkGray5 border border-darkGray5 rounded">
              <input
                className="w-full p-3 border-none hover:border-none focus-visible:outline-none"
                value={addressTo}
                onChange={(e) => {
                  setAddressTo(e.target.value);
                }}
              />
            </div>
            {/* confirmClicked && */}

            <h6 className="italic text-xs font-bold">
              IMPORTANT: Transferring to an incorrect address will result in
              loss of funds.
            </h6>
          </>
        )}
        {addressTo === "" && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAddressEmpty} />
        )}
      </>
    </ContainerModal>
  );
};

export default ToWithdraw;
