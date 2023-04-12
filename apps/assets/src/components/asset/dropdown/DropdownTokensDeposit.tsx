import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TableDataElement } from "../../../internal/asset/functionality/table/normalizeData";
import { DropdownArrow } from "icons";
import { DropdownTokensDepositProps } from "./types";
const DropdownTokensDeposit = ({
  placeholder,
  data,
  setToken,
  setValue,
  token,
}: DropdownTokensDepositProps) => {
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
    if (token !== undefined) {
      if (selectedValue) {
        return (
          <div className="flex items-center space-x-3 font-bold">
            <Image
              src={`/assets/tokens/${selectedValue.symbol.toLowerCase()}.png`}
              alt={selectedValue.symbol}
              width={25}
              height={25}
              className="h-6 w-6"
            />
            <span> {selectedValue.symbol}</span>
          </div>
        );
      }
    }
    return placeholder;
  };

  const onItemClick = (option: TableDataElement) => {
    setSelectedValue(option);
    setToken(option);
    setValue("");
  };

  return (
    <div className="relative w-full cursor-pointer rounded text-left text-black ">
      <div
        onClick={handleInputClick}
        className="flex select-none items-center justify-between p-1"
      >
        {showMenu && (
          <div className="absolute -left-4 top-1 z-[9999] max-h-40 w-auto translate-y-9 overflow-auto rounded border border-darkGray2 bg-white">
            {data?.map((option) => {
              return (
                <div
                  onClick={() => onItemClick(option)}
                  key={option.symbol}
                  className={`flex cursor-pointer justify-between space-x-8 p-3 font-bold hover:bg-gray
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={`/assets/tokens/${option.symbol.toLowerCase()}.png`}
                      alt={option.symbol}
                      width={25}
                      height={25}
                      className=" h-6 w-6"
                    />
                    <span>{option.symbol}</span>
                  </div>
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

export default DropdownTokensDeposit;
