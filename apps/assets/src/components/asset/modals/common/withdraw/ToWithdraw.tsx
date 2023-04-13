import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkFormatAddress } from "../../../../../internal/asset/style/format";
import { KeplrIcon } from "icons";
import { SmallButton } from "small-button";
import AddTokenMetamask from "../../transactions/AddTokenMetamask";
import ContainerInput from "../ContainerInput";
import { ContainerModal } from "../ContainerModal";
import { ErrorMessage } from "error-message";
import { TextSmall } from "../TextSmall";
import { WithdrawReceiverProps } from "../types";
import ChainContainer from "./ChainContainer";
import {
  MODAL_NOTIFICATIONS,
  snackErrorConnectingKeplr,
  getKeplrAddressByChain,
  EVMOS_SYMBOL,
  truncateAddress,
} from "evmos-wallet";

const ToWithdraw = ({
  token,
  receiverAddress,
  setReceiverAddress,
  confirmClicked,
  dropChainProps,
}: WithdrawReceiverProps) => {
  const [showInput, setShowInput] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    const getPrefix = () => {
      let prefix = "";
      if (token !== undefined) {
        prefix = token.prefix;

        if (
          token.symbol === EVMOS_SYMBOL &&
          dropChainProps.chain !== undefined
        ) {
          prefix = dropChainProps.chain.prefix;
        }
      }
      setPrefix(prefix);
    };

    getPrefix();
  }, [token, dropChainProps.chain]);

  const handleOnClickEdit = () => {
    setShowInput(true);
    setShowEditButton(false);
  };
  const dispatch = useDispatch();

  const handleOnClickKeplr = async () => {
    if (token === undefined) {
      // It should never enters here because the button
      // is disabled until the user selects a token
      return;
    }

    let chainId = token.chainId;
    let chainIdentifier = token.chainIdentifier;
    setPrefix(token.prefix);
    if (token.symbol === EVMOS_SYMBOL && dropChainProps.chain !== undefined) {
      chainId = dropChainProps.chain?.chainId;
      chainIdentifier = dropChainProps.chain?.chainIdentifier;
      setPrefix(dropChainProps.chain.prefix);
    }

    const keplrAddress = await getKeplrAddressByChain(chainId, chainIdentifier);
    if (keplrAddress === null) {
      dispatch(snackErrorConnectingKeplr());
      return;
    }
    setReceiverAddress(keplrAddress);
  };

  const walletDiv = () => {
    return (
      <div className="flex items-center space-x-3">
        <TextSmall text="TO" />
        <span>{truncateAddress(receiverAddress)}</span>
        <div className="flex w-full items-center justify-end space-x-5">
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
            onClick={handleOnClickKeplr}
          />
        </div>
      </div>
    );
  };
  const createWalletDiv = () => {
    if (token === undefined) {
      return walletDiv();
    }

    if (
      token !== undefined &&
      dropChainProps.chain !== undefined &&
      dropChainProps.chain.handledByExternalUI !== null
    ) {
      return <></>;
    }
    return walletDiv();
  };

  const addMetamaskDiv = () => {
    return (
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
    );
  };

  const createAddMetamaskDiv = () => {
    if (token === undefined) {
      return addMetamaskDiv();
    }

    if (
      token !== undefined &&
      dropChainProps.chain !== undefined &&
      dropChainProps.chain.handledByExternalUI !== null
    ) {
      return <></>;
    }
    return addMetamaskDiv();
  };
  return (
    <ContainerModal>
      <>
        {createWalletDiv()}
        {token !== undefined && token.symbol === EVMOS_SYMBOL && (
          <ChainContainer dropChainProps={dropChainProps} />
        )}
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

            <h6 className="text-xs font-bold italic">
              IMPORTANT: Transferring to an incorrect address will result in
              loss of funds.
            </h6>
          </>
        )}

        {confirmClicked && receiverAddress === "" && (
          <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorAddressEmpty} />
        )}

        {confirmClicked &&
          token !== undefined &&
          !checkFormatAddress(receiverAddress, prefix) && (
            <ErrorMessage text={MODAL_NOTIFICATIONS.ErrorWrongPrefix} />
          )}
        {createAddMetamaskDiv()}
      </>
    </ContainerModal>
  );
};

export default ToWithdraw;
