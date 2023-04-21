// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TableDataElement } from "../../../internal/asset/functionality/table/normalizeData";
import { DropdownArrow } from "icons";
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
            className="h-6 w-6"
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

export default DropdownTokens;
