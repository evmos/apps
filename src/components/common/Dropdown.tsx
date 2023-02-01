import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  TableData,
  TableDataElement,
} from "../../internal/asset/functionality/table/normalizeData";
import { convertAndFormat } from "../../internal/asset/style/format";
import { EVMOS_SYMBOL } from "../../internal/wallet/functionality/networkConfig";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Dropdown = ({
  placeholder,
  data,
  setTokenTo,
  setAddressTo,
  setValue,
}: {
  placeholder: string;
  data: TableData;
  setTokenTo: Dispatch<SetStateAction<TableDataElement | undefined>>;
  setAddressTo: Dispatch<SetStateAction<string>>;
  setValue: Dispatch<SetStateAction<string>>;
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
            src={`/tokens/${selectedValue.symbol.toLowerCase()}.png`}
            alt={selectedValue.symbol}
            width={25}
            height={25}
          />
          <span> {selectedValue.symbol}</span>
        </div>
      );
    }
    return placeholder;
  };

  const onItemClick = (option: TableDataElement) => {
    setSelectedValue(option);
    setTokenTo(option);
    setAddressTo("");
    setValue("");
  };

  return (
    <div className="text-left w-full relative rounded cursor-pointer text-black ">
      <div
        onClick={handleInputClick}
        className="p-1 flex items-center justify-between select-none"
      >
        {showMenu && (
          <div className="z-[9999] absolute translate-y-9 -left-4 top-0 w-auto overflow-auto max-h-40 bg-white border border-darkGray2 rounded">
            {data.table.map((option) => {
              if (option.symbol !== EVMOS_SYMBOL) {
                return (
                  <div
                    onClick={() => onItemClick(option)}
                    key={option.symbol}
                    className={`p-3 cursor-pointer hover:bg-gray flex justify-between space-x-8 font-bold
                  `}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`/tokens/${option.symbol.toLowerCase()}.png`}
                        alt={option.symbol}
                        width={25}
                        height={25}
                      />
                      <span>{option.symbol}</span>
                    </div>
                    <p className="pl-11">
                      {convertAndFormat(option.erc20Balance, option.decimals)}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        )}
        <div>{getDisplay()}</div>
        <div>
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
