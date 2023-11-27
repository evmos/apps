// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CopyIcon } from "icons";

export const CopyContainer = ({
  address = "",
  handleOnClick,
}: {
  address?: string;
  handleOnClick: () => void;
}) => {
  return (
    <button
      onClick={handleOnClick}
      className="flex items-center space-x-2 cursor-pointer"
    >
      <p className="text-[8px]">{address}</p>
      <CopyIcon />
    </button>
  );
};
