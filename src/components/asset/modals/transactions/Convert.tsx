import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { StoreType } from "../../../../redux/Store";
import ConfirmButton from "../../../common/ConfirmButton";
import { ModalTitle } from "../../../common/Modal";
import Arrow from "../common/Arrow";
import { ContainerModal } from "../common/ContainerModal";
import FromConvert from "../common/FromConvert";
import ToConvert from "../common/ToConvert";
import { WEVMOS_CONTRACT_ADDRESS } from "../constants";
import { WEVMOS } from "./contracts/abis/WEVMOS/WEVMOS";
import WETH_ABI from "./contracts/abis/WEVMOS/WEVMOS.json";
import { createContract } from "./contracts/contractHelper";
import { Token } from "../../../../internal/wallet/functionality/metamask/metamaskHelpers";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import {
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
  snackRequestRejected,
} from "../../../../internal/asset/style/snackbars";
import Note from "../common/Note";

export const Convert = ({
  item,
  address,
  setShow,
  isIBCBalance = false,
  feeBalance,
}: {
  item: TableDataElement;
  address: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  isIBCBalance?: boolean;
  feeBalance: BigNumber;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const dispatch = useDispatch();
  const WEVMOS = WEVMOS_CONTRACT_ADDRESS;

  let balanceFrom = item.erc20Balance;
  let balanceTo = item.cosmosBalance;
  let symbolFrom = "WEVMOS";
  let symbolTo = "EVMOS";
  if (isIBCBalance) {
    balanceFrom = item.cosmosBalance;
    balanceTo = item.erc20Balance;
    symbolFrom = "EVMOS";
    symbolTo = "WEVMOS";
  }
  const token: Token = {
    erc20Address: item.erc20Address,
    symbol: item.symbol,
    decimals: item.decimals,
    img: item.pngSrc,
  };

  const handleConfirmButton = async () => {
    setConfirmClicked(true);
    if (wallet.evmosPubkey === null) {
      dispatch(snackRequestRejected());
      setShow(false);
      return;
    }
    if (
      inputValue === undefined ||
      inputValue === null ||
      inputValue === "" ||
      inputValue === "0"
    ) {
      return;
    }
    const amount = parseUnits(inputValue, BigNumber.from(item.decimals));
    if (amount.gt(balanceFrom)) {
      return;
    }
    if (isIBCBalance) {
      try {
        const contract = await createContract(
          WEVMOS,
          WETH_ABI,
          wallet.extensionName
        );
        if (contract === null) {
          dispatch(snackErrorGeneratingTx());
          setShow(false);
          return;
        }
        setDisabled(true);
        const res = await (contract as WEVMOS).deposit({
          value: amount,
        });
        dispatch(
          snackBroadcastSuccessful(res.hash, "www.mintscan.io/evmos/txs/")
        );
      } catch (e) {
        // TODO: Add Sentry here!
        dispatch(snackErrorGeneratingTx());
      }
    } else {
      try {
        const contract = await createContract(
          WEVMOS,
          WETH_ABI,
          wallet.extensionName
        );
        if (contract === null) {
          dispatch(snackErrorGeneratingTx());
          setShow(false);
          return;
        }
        setDisabled(true);
        const res = await (contract as WEVMOS).withdraw(amount);
        dispatch(
          snackBroadcastSuccessful(res.hash, "www.mintscan.io/evmos/txs/")
        );
      } catch (e) {
        // TODO: Add Sentry here!
        dispatch(snackErrorGeneratingTx());
      }
    }
    setShow(false);
  };

  return (
    <>
      <ModalTitle title="Convert WEVMOS" />
      <ContainerModal>
        <>
          <FromConvert
            fee={{
              fee: BigNumber.from("300000000000000000"),
              feeDenom: EVMOS_SYMBOL,
              feeBalance: feeBalance,
              feeDecimals: 18,
            }}
            balance={{
              denom: symbolFrom,
              amount: balanceFrom,
              decimals: item.decimals,
            }}
            input={{ value: inputValue, setInputValue, confirmClicked }}
            style={{
              tokenTo: symbolFrom,
              address,
              img: `/tokens/${symbolFrom.toLowerCase()}.png`,
              text: symbolFrom,
            }}
          />
          <Note
            text={getReservedForFeeText(
              BigNumber.from("300000000000000000"),
              EVMOS_SYMBOL,
              EVMOS_SYMBOL
            )}
          />
        </>
      </ContainerModal>
      <Arrow />
      <ContainerModal>
        <>
          <ToConvert
            token={symbolTo}
            img={`/tokens/${symbolTo.toLowerCase()}.png`}
            balance={balanceTo}
            decimals={item.decimals}
            addToken={token}
          />
        </>
      </ContainerModal>
      <div className="mb-4"></div>
      <ConfirmButton
        disabled={disabled}
        onClick={handleConfirmButton}
        text="Convert"
      />
    </>
  );
};
