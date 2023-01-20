import { BigNumber } from "@ethersproject/bignumber";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../../../redux/Store";
import { ModalTitle } from "../../../common/Modal";
import { BROADCASTED_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import FromWithdraw from "../common/FromWithdraw";
import AmountWithdraw from "../common/AmountWithdraw";
import {
  TableData,
  TableDataElement,
} from "../../../../internal/asset/functionality/table/normalizeData";
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
import ExternalLinkIcon from "../../../common/images/icons/ExternalLink";
import Link from "next/link";

const Withdraw2 = ({
  data,
  feeBalance,
  address,
  setShow,
}: {
  data: TableData;
  feeBalance: BigNumber;
  address: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const [tokenTo, setTokenTo] = useState<TableDataElement>();

  const handleConfirmButton = async () => {
    setConfirmClicked(true);
    if (wallet.evmosPubkey === null) {
      dispatch(snackRequestRejected());
      setShow(false);
      return;
    }
    // avoid withdraw if token is not selected
    if (tokenTo === undefined) {
      return;
    }

    if (
      inputValue === undefined ||
      inputValue === null ||
      inputValue === "" ||
      inputValue === "0" ||
      addressTo === undefined ||
      addressTo === null ||
      addressTo === ""
    ) {
      return;
    }
    const amount = parseUnits(inputValue, BigNumber.from(tokenTo.decimals));

    if (amount.gt(tokenTo.erc20Balance)) {
      return;
    }

    const params: IBCChainParams = {
      sender: address,
      receiver: addressTo,
      amount: amount.toString(),
      srcChain: EVMOS_SYMBOL,
      dstChain: tokenTo.chainIdentifier,
      token: tokenTo.symbol,
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
      tokenTo.prefix
    );

    dispatch(snackExecuteIBCTransfer(res));
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
    setShow(false);
  };

  return (
    <>
      <ModalTitle title="Withdraw Tokens" />
      <div className="text-darkGray3 space-y-3">
        <FromWithdraw address={address} />
        <AmountWithdraw
          data={data}
          setTokenTo={setTokenTo}
          tokenTo={tokenTo}
          value={inputValue}
          setValue={setInputValue}
          confirmClicked={confirmClicked}
        />
        {tokenTo === undefined || tokenTo.handledByExternalUI === null ? (
          <ToWithdraw
            tokenTo={tokenTo}
            addressTo={addressTo}
            setAddressTo={setAddressTo}
            confirmClicked={confirmClicked}
          />
        ) : (
          ""
        )}
        {tokenTo !== undefined && tokenTo.handledByExternalUI !== null ? (
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={tokenTo.handledByExternalUI.url}
          >
            <div className="mt-11 flex items-center justify-center space-x-3 bg-red text-white uppercase w-full rounded px-8 py-2 text-lg font-bold font-[GreyCliff] hover:bg-red1">
              <span>Withdraw from Axelar</span> <ExternalLinkIcon />
            </div>
          </Link>
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
