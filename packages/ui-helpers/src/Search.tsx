// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { SearchIcon } from "icons";

interface searchProps {
  placeholder: string;
  handleOnClick: React.MouseEventHandler<SVGElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  value: string;
  handleSetValue: React.ChangeEventHandler<HTMLInputElement>;
}

export const Search = ({ props }: { props: searchProps }) => {
  return (
    <div className="border-darkGray3 bg-darkGray3 flex items-center justify-between rounded border px-4 font-medium">
      <input
        onChange={props.handleSetValue}
        value={props.value}
        className="text-pearl placeholder:text-darkGray5 w-full bg-transparent focus-visible:outline-none"
        placeholder={props.placeholder}
        onKeyDown={props.handleKeyDown}
      />
      <SearchIcon
        className="h-10 w-10 cursor-pointer text-white"
        onClick={props.handleOnClick}
      />
    </div>
  );
};
