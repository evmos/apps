// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StoreType } from "evmos-wallet";
import { useSelector } from "react-redux";
import { useTransakEvents } from "./useTransakEvents";

export const TRANSAK_API_KEY = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ?? "";

export default function Transak() {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  useTransakEvents();

  return (
    <div className="relative mx-auto mt-[25px] h-[700px] w-[300px] overflow-hidden rounded-[15px] md:h-[545px] md:w-[400px]">
      <iframe
        // eslint-disable-next-line no-secrets/no-secrets
        src={`https://global.transak.com?apiKey=${TRANSAK_API_KEY}&themeColor=ed4e33&cryptoCurrencyCode=EVMOS&network=evmos&defaultPaymentMethod=credit_debit_card&disableWalletAddressForm=true&walletAddress=${wallet.evmosAddressEthFormat}`}
        allow="camera;microphone;fullscreen;payment"
        style={{ height: "100%", width: "100%", border: "none" }}
      ></iframe>
    </div>
  );
}
