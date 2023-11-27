// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { KEPLR_DOWNLOAD_URL, STEP_STATUS } from "constants-helper";

import {
  connectWith,
  getActiveProviderKey,
  getGlobalKeplrProvider,
} from "@evmosapps/evmos-wallet";
import { E } from "helpers";

const MODAL_STATE = "modalTransferState";
const MODAL_STATE_DEFAULTS = {
  reloadKeplr: false,
  modalFlag: false,
};
type TransferModalState = typeof MODAL_STATE_DEFAULTS;

export const getTransferModalState = () => {
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

const checkConnectionKeplr = () => {
  if (getActiveProviderKey() === "keplr") {
    return true;
  }
  return false;
};

const switchToKeplr = async () => {
  if (getActiveProviderKey() === "keplr") {
    return true;
  } else {
    const [e] = await E.try(() => connectWith("keplr"));
    if (e === null) {
      return true;
    } else {
      return false;
    }
  }
};

export const stepsSetAccountKeplr = [
  {
    id: "install",
    buttonText: "Install Keplr",
    checkAction: () => installKeplr(),
    loadingText: ["Waiting for Keplr Setup"],
    doneText: "Keplr Installed",
    actions: [() => connectKeplr()],
    errorsText: ["Keplr not installed"],
    href: KEPLR_DOWNLOAD_URL,
    hrefAction: () => reloadPage(),
    status: STEP_STATUS.CURRENT,
    // TODO: update the tracker events
    tracker: {
      init: "init",
      provider: "Keplr",
      successful: "successful",
      unsuccessful: "unsuccessful",
    },
  },

  {
    id: "connect",
    buttonText: "Switch to Keplr",
    checkAction: () => checkConnectionKeplr(),
    loadingText: ["Approve on Keplr"],
    actions: [() => switchToKeplr()],
    errorsText: ["Approval Rejected, please try again"],
    doneText: "Keplr Connected",
    status: STEP_STATUS.NOT_PROCESSED,
    // TODO: update the tracker events
    tracker: {
      init: "init",
      provider: "Keplr",
      successful: "successful",
      unsuccessful: "unsuccessful",
    },
  },
];

export const TRANSFER_TYPES = {
  DEPOSIT: "Deposit",
  SEND: "Send",
};
