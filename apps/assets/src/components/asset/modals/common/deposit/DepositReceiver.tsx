import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeplrIcon from "../../../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../../../common/images/icons/MetamaskIcon";

import { ContainerModal } from "../ContainerModal";
import ErrorMessage from "../ErrorMessage";
import { TextSmall } from "../TextSmall";
import AddTokenMetamask from "../../transactions/AddTokenMetamask";

import SmallButton from "../../../../common/SmallButton";
import ContainerInput from "../ContainerInput";
import { TableDataElement } from "../../../../../internal/asset/functionality/table/normalizeData";
import {
  checkFormatAddress,
  checkMetaMaskFormatAddress,
} from "../../../../../internal/asset/style/format";
import {
  getKeplrAddressByChain,
  getWallet,
  EVMOS_CHAIN,
  truncateAddress,
  snackErrorConnectingKeplr,
  snackErrorConnectingMetaMask,
  MODAL_NOTIFICATIONS,
  StoreType,
} from "evmos-wallet";
const DepositReceiver = ({
  receiver,
  setReceiver,
  setShow,
  confirmClicked,
  token,
}: {
  receiver: string;
  setReceiver: Dispatch<SetStateAction<string>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  confirmClicked: boolean;
  token: TableDataElement | undefined;
}) => {
  const dispatch = useDispatch();

  const [showInput, setShowInput] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const handleOnClickEdit = () => {
    setShowInput(true);
    setShowEditButton(false);
  };

  const handleOnClickKeplr = async () => {
    const wallet = await getKeplrAddressByChain(EVMOS_CHAIN.cosmosChainId);
    if (wallet === null) {
      dispatch(snackErrorConnectingKeplr());
      setShow(false);
      return;
    }
    setReceiver(wallet);
  };

  const handleOnClickMetaMask = async () => {
    const address = await getWallet();
    if (address === null) {
      dispatch(snackErrorConnectingMetaMask());
      setShow(false);
      return;
    }
    setReceiver(address);
  };

  const wallet = useSelector((state: StoreType) => state.wallet.value);

  return (
    <ContainerModal>
      <>
        <div className="flex items-center space-x-4">
          <TextSmall text="TO" />
          <Image
            src="/assets/tokens/evmos.png"
            alt="evmos"
            width={25}
            height={25}
            className="w-auto"
          />
          <div>
            <p className="font-bold">Evmos</p>
            <p className="text-xs">{truncateAddress(receiver)}</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-end space-x-5">
          <SmallButton
            className={`${!showEditButton ? "invisible" : ""}`}
            text="EDIT"
            onClick={handleOnClickEdit}
          />

          {wallet.evmosAddressCosmosFormat !== "" && (
            <KeplrIcon
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={handleOnClickKeplr}
            />
          )}
          <MetamaskIcon
            width={25}
            height={25}
            className="cursor-pointer"
            onClick={handleOnClickMetaMask}
          />
        </div>
        {showInput && (
          <>
            <ContainerInput>
              <input
                className="w-full border-none hover:border-none focus-visible:outline-none"
                value={receiver}
                onChange={(e) => {
                  setReceiver(e.target.value);
                }}
              />
            </ContainerInput>

            <h6 className="text-xs font-bold italic">
              IMPORTANT: Transferring to an incorrect address will result in
              loss of funds.
            </h6>
          </>
        )}
        {confirmClicked && receiver === "" && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAddressEmpty} />
        )}

        {confirmClicked &&
          !checkFormatAddress(receiver, "evmos") &&
          !checkMetaMaskFormatAddress(receiver) && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorWrongPrefix} />
          )}
        <div className="flex w-full justify-end">
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

export default DepositReceiver;
