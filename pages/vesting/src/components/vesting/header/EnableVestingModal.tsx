// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ErrorMessage, Label } from "@evmosapps/ui-helpers";
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

import { Log } from "helpers";
import { EXPLORER_URL } from "constants-helper";

import { E } from "helpers";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";
import { ModalTitle } from "../../ModalTitle";
import { getChainId, switchChain } from "wagmi/actions";
import { useConfig } from "wagmi";
import { useTranslation } from "@evmosapps/i18n/client";

const evmos = getEvmosChainInfo();
export const EnableVestingModal = ({ onClose }: { onClose: () => void }) => {
  const [disabled, setDisabled] = useState(false);
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  const { createClawbackVestingAccount } = useVestingPrecompile();
  const config = useConfig();
  const handleOnClick = async (d: FieldValues) => {
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

      const hash = await createClawbackVestingAccount(
        d.address as string,
        wallet.evmosAddressEthFormat,
        false,
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
      onClose();
    } catch (e) {
      Log().error(e);
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

    if (d.accountName !== "") {
      setVestingAccountNameLocalstorage(
        d.address as string,
        d.accountName as string,
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

  const { t } = useTranslation("vesting");
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
          className="w-full cursor-pointer rounded p-2 text-lg text-pearl"
          value={t("enable.button.action.title")}
        />
      </form>
    </div>
  );
};
