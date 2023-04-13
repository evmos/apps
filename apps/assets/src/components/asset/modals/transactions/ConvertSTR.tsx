import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useState } from "react";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";
import { ConfirmButton } from "confirm-button";
import { ModalTitle } from "modal";
import { ContainerModal } from "../common/ContainerModal";
import FromConvert from "../common/convert/FromConvert";
import ToConvert from "../common/convert/ToConvert";

import { Token, EVMOS_SYMBOL } from "evmos-wallet";
import { getReservedForFeeText } from "helpers";

import Note from "../common/Note";
import { useConvert } from "./hooks/useConvert";

export const ConvertSTR = ({
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

  const useConvertProps = {
    setConfirmClicked,
    setShow,
    inputValue,
    item,
    setDisabled,
    balance: {
      balanceFrom,
      isIBCBalance,
    },
  };

  const { handleConfirmButton } = useConvert(useConvertProps);

  return (
    <>
      <ModalTitle title={`Convert ${symbolFrom}`} />
      <div className="space-y-3 text-darkGray3">
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
                img: `/assets/tokens/${symbolFrom.toLowerCase()}.png`,
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
        <ContainerModal>
          <>
            <ToConvert
              token={symbolTo}
              img={`/assets/tokens/${symbolTo.toLowerCase()}.png`}
              balance={balanceTo}
              decimals={item.decimals}
              addToken={token}
            />
          </>
        </ContainerModal>
      </div>
      <div className="mb-4"></div>
      <ConfirmButton
        disabled={disabled}
        onClick={handleConfirmButton}
        text="Convert"
      />
    </>
  );
};
