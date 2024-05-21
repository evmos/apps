// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect } from "react";
import { useEditModal } from "../edit/ModalEdit";
import { useOtherWalletsModal } from "./WalletsModal";
import { useWallet } from "@evmosapps/evmos-wallet";

export const useDropdownState = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const { isOpen: editModalOpen } = useEditModal();
  const { isOpen: otherWallets } = useOtherWalletsModal();
  const { setIsDropdownOpen, isDropdownOpen, setDropdownState } = useWallet();
  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !editModalOpen &&
      !otherWallets
    ) {
      setIsDropdownOpen(!isDropdownOpen);
      setDropdownState("profile");
    }
  };
  const closeOnEscapePressed = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !editModalOpen && !otherWallets) {
      setIsDropdownOpen(!isDropdownOpen);
      setDropdownState("profile");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !isDropdownOpen);
    document.addEventListener("keydown", closeOnEscapePressed, !isDropdownOpen);
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        !isDropdownOpen,
      );
      document.removeEventListener(
        "keydown",
        closeOnEscapePressed,
        !isDropdownOpen,
      );
    };
  });

  useEffect(() => {
    const status = localStorage.getItem("redirect-wallet");
    if (status === "true") {
      setIsDropdownOpen(true);
      localStorage.removeItem("redirect-wallet");
    }
  }, [setIsDropdownOpen]);
  return;
};
