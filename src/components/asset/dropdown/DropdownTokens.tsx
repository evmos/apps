import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TableDataElement } from "../../../internal/asset/functionality/table/normalizeData";
import { convertAndFormat } from "../../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import DropdownArrow from "../../common/images/icons/DropdownArrow";
import { DropdownTokensProps } from "./types";
const DropdownTokens = ({
  placeholder,
  data,
  setToken,
  setAddress,
  setValue,
  setChain,
}: DropdownTokensProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<TableDataElement | null>(
    null
  );
  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (selectedValue) {
      return (
        <div className="flex items-center space-x-3 font-bold">
          <Image
            src={`/assets/tokens/${selectedValue.symbol.toLowerCase()}.png`}
            alt={selectedValue.symbol}
            width={25}
            height={25}
            className="w-6 h-6"
          />
          <span> {selectedValue.symbol}</span>
        </div>
      );
    }
    return placeholder;
  };

  const onItemClick = (option: TableDataElement) => {
    setSelectedValue(option);
    setToken(option);
    setAddress("");
    setValue("");
    // TODO: is it right to set as undefined?
    setChain(undefined);
  };

  return (
    <div className="text-left w-full relative rounded cursor-pointer text-black ">
      <div
        onClick={handleInputClick}
        className="p-1 flex items-center justify-between select-none"
      >
        {showMenu && (
          <div className="z-[9999] absolute translate-y-9 -left-4 top-1 w-auto overflow-auto max-h-40 bg-white border border-darkGray2 rounded">
            {data?.map((option) => {
              // evmos keeps using cosmosBalance
              let balance = option.erc20Balance;
              if (option.symbol === EVMOS_SYMBOL) {
                balance = option.cosmosBalance;
              }
              return (
                <div
                  onClick={() => onItemClick(option)}
                  key={option.symbol}
                  className={`p-3 cursor-pointer hover:bg-gray flex justify-between space-x-8 font-bold
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={`/assets/tokens/${option.symbol.toLowerCase()}.png`}
                      alt={option.symbol}
                      width={25}
                      height={25}
                      className=" w-6 h-6"
                    />
                    <span>{option.symbol}</span>
                  </div>
                  <p className="pl-11">
                    {convertAndFormat(balance, option.decimals)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {getDisplay()}
        <div>
          <DropdownArrow />
        </div>
      </div>
    </div>
  );
};

export default DropdownTokens;
