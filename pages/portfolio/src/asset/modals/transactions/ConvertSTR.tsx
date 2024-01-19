// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction, useState } from "react";

import { ConfirmButton } from "@evmosapps/ui-helpers";
import { ContainerModal } from "../common/ContainerModal";
import FromConvert from "../common/convert/FromConvert";
import ToConvert from "../common/convert/ToConvert";

import { Token, EVMOS_SYMBOL } from "@evmosapps/evmos-wallet";
import { getReservedForFeeText } from "helpers";

import Note from "../common/Note";
import { useConvert } from "./hooks/useConvert";
import { BigNumber } from "@ethersproject/bignumber";
import { TableDataElement } from "../../../utils/table/normalizeData";

export const ConvertSTR = ({
  item,
  address,
  setIsOpen,
  isIBCBalance = false,
  feeBalance,
}: {
  item: TableDataElement;
  address: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
    setIsOpen,
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
      <h2 className="font-bold mb-4">{`Convert ${symbolFrom}`}</h2>
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
                img: `/tokens/${symbolFrom.toLowerCase()}.png`,
                text: symbolFrom,
              }}
            />
            <Note
              text={getReservedForFeeText(
                BigNumber.from("300000000000000000"),
                EVMOS_SYMBOL,
                EVMOS_SYMBOL,
              )}
            />
          </>
        </ContainerModal>
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
