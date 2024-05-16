// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useModal } from "helpers";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";

import { SearchFilter } from "./Search";
import { Input } from "@evmosapps/ui/components/inputs/Input.tsx";
import { IconSearch } from "@evmosapps/ui/icons/line/basic/search.tsx";
import { Wallets } from "./Wallets";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";
import { useTranslation } from "@evmosapps/i18n/client";
import { sendEvent, SEARCH_FOR_WALLET } from "tracker";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
export const useOtherWalletsModal = () => useModal("supported-wallets");

export const WalletsModal = () => {
  const { isOpen, setIsOpen } = useOtherWalletsModal();
  const { setIsDropdownOpen } = useWallet();
  const { searchTerm, handleSearchChange, filteredOptions } = SearchFilter();
  const { t } = useTranslation("dappStore");
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setIsOpen(false);
        setIsDropdownOpen(true);
      }}
    >
      <Modal.Body>
        <Modal.Header className="text-2xl">
          {t("signIn.supportedWallets.title")}
        </Modal.Header>
        <div className="w-full flex justify-start items-center relative mt-8 mb-6">
          <IconSearch className="absolute w-4 shrink-0 left-3" />
          <Input
            onClick={() =>
              sendEvent(SEARCH_FOR_WALLET, {
                "Wallet provider": getActiveProviderKey(),
              })
            }
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={t("signIn.supportedWallets.search.placeholder")}
            type="text"
            className="w-full rounded-full pl-10"
          />
        </div>

        <div className="max-h-[350px] overflow-auto scrollbar-hidden">
          <Dropdown.Menu as="div">
            <Wallets wallets={filteredOptions} />
          </Dropdown.Menu>
        </div>
      </Modal.Body>
    </Modal>
  );
};
