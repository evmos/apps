// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useState } from "react";

import { DropdownArrow } from "icons";

import { DropdownOption } from "../utils";

export default function ProviderDropwdown<
  T extends Readonly<DropdownOption[]>,
>({
  selectedValue,
  dropdownOptions,
  onItemClick,
}: {
  dropdownOptions: T;
  selectedValue: T[number];
  onItemClick: (option: T[number]) => void;
}) {
  const [showMenu, setIsOpenMenu] = useState(false);
  useEffect(() => {
    const handler = () => setIsOpenMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpenMenu(!showMenu);
  };

  return (
    <div
      data-testid="card-provider-dropdown"
      onClick={handleInputClick}
      className="inline-flex select-none items-center justify-between p-1 relative"
    >
      {showMenu && (
        <div className="border-gray300 absolute -right-1 top-2 z-[9999] max-h-40 w-36 translate-y-9 overflow-auto rounded-md border bg-white md:w-60">
          {dropdownOptions?.map((option) => {
            return (
              <button
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`hover:bg-gray flex w-full flex-1 cursor-pointer justify-between space-x-8 p-3 font-bold whitespace-nowrap`}
              >
                <div className="flex items-center gap-1">
                  <div>
                    <div>{option.image}</div>
                  </div>
                  <span className="text-sm">{option.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
      <div className="border-gray300 -mr-2 flex w-36 items-center justify-between space-x-3 rounded-md border p-1.5 font-bold md:w-60">
        <div className="flex items-center gap-1">
          {selectedValue?.image}
          <span className="text-sm"> {selectedValue?.name}</span>
        </div>
        <DropdownArrow />
      </div>
    </div>
  );
}
