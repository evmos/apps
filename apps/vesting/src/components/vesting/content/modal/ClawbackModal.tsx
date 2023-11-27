import { ConfirmButton, ModalTitle } from "@evmosapps/ui-helpers";
import { ItemModal } from "./ItemModal";
import { ExclamationIcon } from "icons";
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
import { useTranslation } from "next-i18next";
import { EXPLORER_URL } from "constants-helper";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { E } from "helpers";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";

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

  const handleOnClick = async () => {
    const connectedNetwork = getNetwork();
    if (connectedNetwork.chain?.id !== evmos.id) {
      const [err] = await E.try(() =>
        switchNetwork({
          chainId: evmos.id,
        }),
      );
      if (err) return;
    }
    try {
      setDisabled(true);

      const res = await clawback(
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
            hash: res?.hash,
            explorerTxUrl: `${EXPLORER_URL}/tx/`,
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

  const { t } = useTranslation();
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
          <ExclamationIcon className="text-red" />
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
