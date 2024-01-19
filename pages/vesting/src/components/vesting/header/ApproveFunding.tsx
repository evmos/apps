// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { useVestingPrecompile } from "../../../internal/useVestingPrecompile";
import { useDispatch } from "react-redux";
import {
  addSnackbar,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
} from "@evmosapps/evmos-wallet";
import { EXPLORER_URL } from "constants-helper";
import { ModalTitle } from "../../ModalTitle";
import { useTranslation } from "@evmosapps/i18n/client";

export default function ApproveFunding({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation("vesting");
  const [safeAddress, setSafeAddress] = useState<string>("");
  const { approveFunding } = useVestingPrecompile();
  const dispatch = useDispatch();

  const disabled = !safeAddress || safeAddress === "";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleApprove() {
    setIsLoading(true);
    try {
      const hash = await approveFunding(safeAddress);
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.LINK,
            title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
            hash,
            explorerTxUrl: `${EXPLORER_URL}/tx`,
          },
          type: SNACKBAR_TYPES.SUCCESS,
        }),
      );
      setIsLoading(false);
      onClose();
    } catch {
      setIsLoading(false);
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          },
          type: SNACKBAR_TYPES.ERROR,
        }),
      );
    }
  }

  return (
    <div className="space-y-5">
      <ModalTitle title={t("vesting.fund.title")} />
      <div className="flex flex-col space-y-3">
        <span>{t("vesting.executioner.address.body")}</span>
        <label htmlFor="address" className="text-xs font-bold">
          {t("vesting.safe.address.title")}
        </label>
        <input
          id="address"
          onChange={(e) => setSafeAddress(e.target.value)}
          className="textBoxStyle"
          placeholder="Enter safe address"
        />
        <button
          onClick={handleApprove}
          disabled={disabled || isLoading}
          style={{ backgroundColor: "#ed4e33" }}
          className={`w-full cursor-pointer rounded p-2 font-body text-lg text-pearl ${
            disabled || isLoading ? "opacity-40" : ""
          }`}
        >
          {isLoading ? "Loading..." : t("vesting.approve.button")}
        </button>
      </div>
    </div>
  );
}
