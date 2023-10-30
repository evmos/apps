// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { TableDataElement } from "../../../internal/asset/functionality/table/normalizeData";
import { EVMOS_SYMBOL } from "evmos-wallet";
import { DropdownArrow } from "icons";
import { DropdownChainsProps } from "./types";

const DropdownChains = ({
  dropChainProps,
}: {
  dropChainProps: DropdownChainsProps;
}) => {
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
            src={`/portfolio/chains/${selectedValue.chainIdentifier}.png`}
            alt={selectedValue.chainIdentifier}
            width={25}
            height={25}
            className="h-6 w-6"
          />
          <span> {selectedValue.chainIdentifier}</span>
        </div>
      );
    }
    return dropChainProps.placeholder;
  };

  const onItemClick = (option: TableDataElement) => {
    setSelectedValue(option);
    dropChainProps.setChain(option);
    dropChainProps.setAddress("");
  };

  // get the uniques chains for select
  const chainsWithoutRep = useMemo(() => {
    const temp = new Set<string>();
    const ret: TableDataElement[] = [];
    dropChainProps?.data?.table.forEach((e) => {
      if (temp.has(e.chainIdentifier) === false) {
        temp.add(e.chainIdentifier);
        ret.push(e);
      }
    });
    return ret;
  }, [dropChainProps?.data?.table]);

  return (
    <div className="relative w-full cursor-pointer rounded text-left text-black ">
      <div
        onClick={handleInputClick}
        className="flex select-none items-center justify-between p-1"
      >
        {showMenu && (
          <div className="absolute -left-4 top-1 z-[9999] max-h-32 w-auto translate-y-9 overflow-auto rounded border border-darkGray2 bg-white">
            {chainsWithoutRep.map((option) => {
              if (option.symbol !== EVMOS_SYMBOL) {
                return (
                  <div
                    onClick={() => onItemClick(option)}
                    key={option.chainIdentifier}
                    className={`flex cursor-pointer justify-between space-x-8 p-3 font-bold hover:bg-gray
                  `}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`/portfolio/chains/${option.chainIdentifier}.png`}
                        alt={option.chainIdentifier}
                        width={25}
                        height={25}
                        className="h-6 w-6 rounded-full"
                      />
                      <span>{option.chainIdentifier}</span>
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

export default DropdownChains;
