import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { TableDataElement } from "../../../internal/asset/functionality/table/normalizeData";
import { EVMOS_SYMBOL } from "../../../internal/wallet/functionality/networkConfig";
import DropdownArrow from "../../common/images/icons/DropdownArrow";
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
            src={`/assets/tokens/${selectedValue.symbol.toLowerCase()}.png`}
            alt={selectedValue.symbol}
            width={25}
            height={25}
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
    <div className="text-left w-full relative rounded cursor-pointer text-black ">
      <div
        onClick={handleInputClick}
        className="p-1 flex items-center justify-between select-none"
      >
        {showMenu && (
          <div className="z-[9999] absolute translate-y-9 -left-4 top-0 w-auto overflow-auto max-h-40 bg-white border border-darkGray2 rounded">
            {chainsWithoutRep.map((option) => {
              if (option.symbol !== EVMOS_SYMBOL) {
                return (
                  <div
                    onClick={() => onItemClick(option)}
                    key={option.chainIdentifier}
                    className={`p-3 cursor-pointer hover:bg-gray flex justify-between space-x-8 font-bold
                  `}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`/assets/tokens/${option.symbol.toLowerCase()}.png`}
                        alt={option.symbol}
                        width={25}
                        height={25}
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
