// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { KEPLR_DOWNLOAD_URL } from "@evmosapps/constants";

import { getGlobalKeplrProvider } from "@evmosapps/evmos-wallet";

const MODAL_STATE = "modalTransferState";
const MODAL_STATE_DEFAULTS = {
  reloadKeplr: false,
  modalFlag: false,
};
type TransferModalState = typeof MODAL_STATE_DEFAULTS;

const getTransferModalState = () => {
  const state = localStorage.getItem(MODAL_STATE);
  if (!state) {
    return MODAL_STATE_DEFAULTS;
  }
  return JSON.parse(state) as TransferModalState;
};
const updateTransferModalState = (state: Partial<TransferModalState>) => {
  const newState = { ...getTransferModalState(), ...state };
  localStorage.setItem(MODAL_STATE, JSON.stringify(newState));
  return newState;
};

const removeTransferModalStateFromLocalStorage = () => {
  localStorage.removeItem(MODAL_STATE);
};

export const connectKeplr = () => {
  if (getGlobalKeplrProvider() === null) {
    updateTransferModalState({ modalFlag: true });
    window.open(KEPLR_DOWNLOAD_URL, "_blank");

    return false;
  }
  return true;
};

export const installKeplr = () => {
  removeTransferModalStateFromLocalStorage();
  if (getGlobalKeplrProvider() === null) {
    return false;
  }
  return true;
};

export const reloadPage = () => {
  // for chrome and brave we need to reload the page to know if the user has Keplr installed
  if (getGlobalKeplrProvider()) {
    return true;
  } else {
    if (
      getGlobalKeplrProvider() === null &&
      getTransferModalState().reloadKeplr === false &&
      getTransferModalState().modalFlag === true
    ) {
      updateTransferModalState({ reloadKeplr: true });

      window.location.reload();
      return false;
    }
    return false;
  }
};
