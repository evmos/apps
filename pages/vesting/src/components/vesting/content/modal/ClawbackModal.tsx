// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ConfirmButton } from "@evmosapps/ui-helpers";
import { ItemModal } from "./ItemModal";
import { ExclamationIcon } from "@evmosapps/icons/ExclamationIcon";
import { VestingAccountDetail } from "../../../../internal/types";
import { convertFromAtto, formatNumber } from "helpers";

import {
  addSnackbar,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
  GENERATING_TX_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
  normalizeToEth,
} from "@evmosapps/evmos-wallet";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useVestingPrecompile } from "../../../../internal/useVestingPrecompile";

import { EXPLORER_URL } from "constants-helper";

import { E } from "helpers";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { ModalTitle } from "../../../ModalTitle";
import { useConfig } from "wagmi";
import { getChainId, switchChain } from "wagmi/actions";
import { useTranslation } from "@evmosapps/i18n/client";

const evmos = getEvmosChainInfo();

// TODO: format totalTokens and availableClawback depending on the response
export const ClawbackModal = ({
  vestingDetails,
}: {
  vestingDetails: VestingAccountDetail;
}) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const { clawback } = useVestingPrecompile();
  const config = useConfig();
  const handleOnClick = async () => {
    if (getChainId(config) !== evmos.id) {
      const [err] = await E.try(() =>
        switchChain(config, {
          chainId: evmos.id,
        }),
      );
      if (err) return;
    }
    try {
      setDisabled(true);

      const hash = await clawback(
        normalizeToEth(vestingDetails?.funderAddress) ?? "",
        normalizeToEth(vestingDetails?.accountAddress) ?? "",
        normalizeToEth(vestingDetails?.funderAddress) ?? "",
      );
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
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
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
  };

  const totalTokens = () => {
    return formatNumber(convertFromAtto(vestingDetails.unvestedAmount, 18), 6);
  };

  const availableClawback = () => {
    return formatNumber(
      convertFromAtto(vestingDetails.originalVestingAmount, 18),
      6,
    );
  };

  const { t } = useTranslation("vesting");
  return (
    <div className="space-y-5">
      <ModalTitle title={t("clawback.title")} />
      <div className=" rounded border-2 border-darkGray2 p-4">
        {t("clawback.description")}
      </div>
      <ItemModal
        title={t("clawback.info.account.title")}
        description={vestingDetails.accountAddress}
      />
      <ItemModal
        title={t("clawback.info.vesting.tokens.title")}
        description={`${totalTokens()} EVMOS`}
      />
      <ItemModal
        title={t("clawback.info.available.title")}
        description={`${availableClawback()} EVMOS`}
      />
      <div>
        <div className="flex items-center space-x-1 ">
          <ExclamationIcon className="text-red-300" />
          <span className="text-lg font-bold">{t("clawback.alert.title")}</span>
        </div>
        {t("clawback.alert.description")}
      </div>

      <ConfirmButton
        disabled={disabled}
        text={t("clawback.button.action.title")}
        onClick={handleOnClick}
      />
    </div>
  );
};
