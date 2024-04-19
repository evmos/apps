// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useModal } from "helpers";
import { useSignIn } from "./useSignin";
import { Wallets } from "./Wallets";
import { Menu } from "@headlessui/react";
import { Modal } from "../../../../../../packages/ui/src/components/dialog/Dialog";
import { WalletsForModal } from "./WalletsForModal";

// import { SearchFilter } from "./Search";
// import { Input } from "../../../../../../packages/ui/src/components/inputs/Input";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";
export const useOtherWalletsModal = () => useModal("supported-wallets2");

export const WalletsModal = () => {
  const { isOpen, setIsOpen } = useOtherWalletsModal();
  const { walletsToShow } = useSignIn();
  // const { searchTerm, handleSearchChange, filteredOptions } =
  //   SearchFilter(walletsToShow);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body>
        <Modal.Header className="text-2xl">Other Wallets</Modal.Header>
        {/* <div className="w-full flex justify-start items-center relative">
          <IconSearch className="absolute w-4 shrink-0 left-3" />
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            type="text"
            className="w-full rounded-full pl-8"
          />
        </div> */}

        <div className="max-h-[300px] overflow-auto">
          <WalletsForModal wallets={walletsToShow} />
        </div>
        {/* {filteredOptions.length === 0 && searchTerm && (
          <p>No results found for {searchTerm}</p>
        )} */}
      </Modal.Body>
    </Modal>
  );
};
