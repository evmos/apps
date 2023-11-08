// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { EVMOS_SYMBOL } from "evmos-wallet";
import { DropdownArrow } from "icons";

import { DepositElement } from "../modals/transactions/DepositSTR";
import { DropdownChainsDepositProps } from "./types";
import { CLICK_DEPOSIT_CHOOSE_FROM_CHAIN, useTracker } from "tracker";

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
      function getChainIdentifier(
        chainIdentifier: string
      ): React.ReactNode | Iterable<React.ReactNode> {
        throw new Error("Function not implemented.");
      }

      return (
        <div className="flex items-center space-x-3 font-bold">
          <Image
            src={`/chains/${selectedValue.elements[0].chainIdentifier}.png`}
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
  const { handlePreClickAction } = useTracker(CLICK_DEPOSIT_CHOOSE_FROM_CHAIN);

  const onItemClick = (option: DepositElement) => {
    setSelectedValue(option);
    dropChainProps.setChain(option);
    dropChainProps.setAddress("");
    dropChainProps.setToken(undefined);
    handlePreClickAction({ chain: option.chain });
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
                    onClick={() => {
                      onItemClick(option);
                    }}
                    key={option.chain}
                    className={`flex cursor-pointer justify-between space-x-8 p-3 font-bold hover:bg-gray
                  `}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`/chains/${option.chain}.png`}
                        alt={option.chain}
                        width={25}
                        height={25}
                        className="h-6 w-6 rounded-full"
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
