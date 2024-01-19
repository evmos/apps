// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { DropdownArrowIcon } from "@evmosapps/icons/DropdownArrowIcon";
import { ValidatorsList } from "../../../utils/types";
import { useAllValidators } from "../../../utils/hooks/useAllValidators";

const ValidatorsDropdown = ({
  setValidator,
  setIsValidatorSelected,
  validatorName,
}: {
  setValidator: Dispatch<SetStateAction<string>>;
  setIsValidatorSelected: Dispatch<SetStateAction<boolean>>;
  validatorName: string;
}) => {
  const [showMenu, setIsOpenMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { validators } = useAllValidators();

  useEffect(() => {
    const handler = () => setIsOpenMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (showMenu === false) {
      setIsOpenMenu(true);
    }
  };

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue;
    }
    return "";
  };

  const onItemClick = useCallback(
    (option: ValidatorsList) => {
      setSelectedValue(option.validator.description.moniker);
      setValidator(option.validator.operator_address);
      setIsValidatorSelected(true);
      setIsOpenMenu(!showMenu);
    },
    [setValidator, setIsValidatorSelected, showMenu],
  );

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target.value);
      if (e.target.value !== "") {
        setIsValidatorSelected(true);
      } else {
        setIsValidatorSelected(false);
        setValidator("");
      }
    },
    [setIsValidatorSelected, setValidator],
  );

  const filtered = useMemo(() => {
    // it filters by name
    const filteredData = validators.filter((i) =>
      i.validator.description.moniker
        .toLowerCase()
        .includes(selectedValue.toLowerCase()),
    );
    if (selectedValue !== "") {
      return filteredData;
    } else {
      return validators;
    }
  }, [validators, selectedValue]);

  const listValidators = useMemo(() => {
    return filtered.map((option) => {
      if (option.validator.description.moniker.toLowerCase() !== validatorName)
        return (
          <div
            onClick={() => onItemClick(option)}
            key={option.validator.rank}
            className={`flex cursor-pointer justify-between px-6 py-3 font-semibold hover:bg-gray
              `}
          >
            <div className="flex items-center space-x-3">
              <span>{option.validator.description.moniker}</span>
            </div>
          </div>
        );
    });
  }, [onItemClick, filtered, validatorName]);

  return (
    <div
      className={`relative w-full cursor-pointer rounded bg-white px-3 py-2 text-left text-black ${
        showMenu ? "rounded-b-none" : ""
      }`}
    >
      <div
        onClick={handleInputClick}
        className=" flex select-none items-center justify-between "
      >
        {showMenu && (
          <div className="absolute left-0 top-0 z-[9999] max-h-36 w-full translate-y-9 overflow-auto rounded rounded-t-none bg-white capitalize ">
            {listValidators}
          </div>
        )}
        <input
          className="w-full cursor-pointer border-none font-semibold hover:border-none focus-visible:outline-none"
          value={getDisplay()}
          onChange={handleOnChange}
          onClick={handleInputClick}
        />
        <div className="ml-10">
          <DropdownArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default ValidatorsDropdown;
