import { ErrorMessage, Label, ModalTitle } from "@evmosapps/ui-helpers";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enableAccountSchema,
  setVestingAccountNameLocalstorage,
} from "../helpers";

import {
  StoreType,
  addSnackbar,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
  GENERATING_TX_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
} from "@evmosapps/evmos-wallet";
import { useSelector, useDispatch } from "react-redux";
import { useVestingPrecompile } from "../../../internal/useVestingPrecompile";
import { useTranslation } from "next-i18next";
import { Log } from "helpers";
import { EXPLORER_URL } from "constants-helper";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { E } from "helpers";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";

const evmos = getEvmosChainInfo();
export const EnableVestingModal = () => {
  const [disabled, setDisabled] = useState(false);
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const { createClawbackVestingAccount } = useVestingPrecompile();

  const handleOnClick = async (d: FieldValues) => {
    const connectedNetwork = getNetwork();
    if (connectedNetwork.chain?.id !== evmos.id) {
      const [err] = await E.try(() =>
        switchNetwork({
          chainId: evmos.id,
        })
      );
      if (err) return;
    }
    try {
      setDisabled(true);

      const res = await createClawbackVestingAccount(
        d.address as string,
        wallet.evmosAddressEthFormat,
        false
      );

      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.LINK,
            title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
            hash: res.hash,
            explorerTxUrl: `${EXPLORER_URL}/tx/`,
          },
          type: SNACKBAR_TYPES.SUCCESS,
        })
      );
      setDisabled(false);
    } catch (e) {
      Log().error(e);
      setDisabled(false);
      // TODO: Add Sentry here!
      dispatch(
        addSnackbar({
          id: 0,
          content: {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
          },
          type: SNACKBAR_TYPES.ERROR,
        })
      );
    }

    if (d.accountName !== "") {
      setVestingAccountNameLocalstorage(
        d.address as string,
        d.accountName as string
      );
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enableAccountSchema),
    defaultValues: { address: "" },
  });

  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      <ModalTitle title={t("enable.modal.title")} />

      <form
        onSubmit={handleSubmit(async (d) => {
          await handleOnClick(d).then(() => {});
        })}
        className="flex flex-col space-y-3"
      >
        <Label className="text-black" id="address">
          {t("enable.modal.address.title")}
        </Label>
        <input id="address" {...register("address")} className="textBoxStyle" />
        {errors.address?.message && (
          <ErrorMessage>{errors.address.message.toString()}</ErrorMessage>
        )}
        <input
          type="submit"
          disabled={disabled}
          style={{ backgroundColor: "#ed4e33" }}
          className="w-full cursor-pointer rounded p-2 font-body text-lg text-pearl"
          value={t("enable.button.action.title")}
        />
      </form>
    </div>
  );
};
