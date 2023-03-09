import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import DropdownArrow from "../../common/images/icons/DropdownArrow";
import { useAllValidators } from "../../../internal/staking/functionality/hooks/useAllValidators";
import { ValidatorsList } from "../../../internal/staking/functionality/types";
const ValidatorsDropdown = ({
  setValidator,
  setIsValidatorSelected,
}: {
  setValidator: Dispatch<SetStateAction<string>>;
  setIsValidatorSelected: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { validators } = useAllValidators();

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (showMenu === false) {
      setShowMenu(true);
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
      setShowMenu(!showMenu);
    },
    [setValidator, setIsValidatorSelected, showMenu]
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
    [setIsValidatorSelected, setValidator]
  );

  const filtered = useMemo(() => {
    // it filters by name
    const filteredData = validators.filter((i) =>
      i.validator.description.moniker
        .toLowerCase()
        .includes(selectedValue.toLowerCase())
    );
    if (selectedValue !== "") {
      return filteredData;
    } else {
      return validators;
    }
  }, [validators, selectedValue]);

  const listValidators = useMemo(() => {
    return filtered.map((option) => {
      return (
        <div
          onClick={() => onItemClick(option)}
          key={option.validator.rank}
          className={`px-6 py-3 cursor-pointer hover:bg-gray flex justify-between font-semibold
            `}
        >
          <div className="flex items-center space-x-3">
            <span>{option.validator.description.moniker}</span>
          </div>
        </div>
      );
    });
  }, [onItemClick, filtered]);

  return (
    <div
      className={`px-3 py-2 text-left relative w-full cursor-pointer text-black bg-white rounded ${
        showMenu ? "rounded-b-none" : ""
      }`}
    >
      <div
        onClick={handleInputClick}
        className=" flex items-center justify-between select-none "
      >
        {showMenu && (
          <div className="z-[9999] absolute w-full translate-y-9 left-0 top-0 overflow-auto max-h-36 bg-white capitalize rounded rounded-t-none ">
            {listValidators}
          </div>
        )}
        <input
          className="w-full border-none hover:border-none focus-visible:outline-none font-semibold cursor-pointer"
          value={getDisplay()}
          onChange={handleOnChange}
          onClick={handleInputClick}
        />
        <div className="ml-10">
          <DropdownArrow />
        </div>
      </div>
    </div>
  );
};

export default ValidatorsDropdown;
