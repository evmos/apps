import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getChainIdentifier } from "../../../internal/asset/Helpers";
import { EVMOS_SYMBOL } from "evmos-wallet";
import { DropdownArrow } from "icons";

import { DepositElement } from "../modals/transactions/DepositSTR";
import { DropdownChainsDepositProps } from "./types";
const DropdownChainDeposit = ({
  dropChainProps,
}: {
  dropChainProps: DropdownChainsDepositProps;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<DepositElement | null>(
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
            src={`/assets/chains/${selectedValue.elements[0].chainIdentifier}.png`}
            alt={selectedValue.elements[0].chainIdentifier}
            width={25}
            height={25}
            className="h-6 w-6"
          />
          <span>
            {getChainIdentifier(selectedValue.elements[0].chainIdentifier)}
          </span>
        </div>
      );
    }
    return dropChainProps.placeholder;
  };

  const onItemClick = (option: DepositElement) => {
    setSelectedValue(option);
    dropChainProps.setChain(option);
    dropChainProps.setAddress("");
    dropChainProps.setToken(undefined);
  };

  return (
    <div className="relative w-full cursor-pointer rounded text-left text-black ">
      <div
        onClick={handleInputClick}
        className="flex select-none items-center justify-between p-1"
      >
        {showMenu && (
          <div className="absolute -left-4 top-1 z-[9999] max-h-32 w-auto translate-y-9 overflow-auto rounded border border-darkGray2 bg-white">
            {dropChainProps.data.map((option) => {
              if (option.chain !== EVMOS_SYMBOL) {
                return (
                  <div
                    onClick={() => onItemClick(option)}
                    key={option.chain}
                    className={`flex cursor-pointer justify-between space-x-8 p-3 font-bold hover:bg-gray
                  `}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`/assets/chains/${option.chain}.png`}
                        alt={option.chain}
                        width={25}
                        height={25}
                        className=" h-6 w-6"
                      />
                      <span>{getChainIdentifier(option.chain)}</span>
                    </div>
                  </div>
                );
              }
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

export default DropdownChainDeposit;
