// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useTransakEvents } from "./useTransakEvents";
import { useAccount } from "wagmi";

const TRANSAK_API_KEY = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ?? "";

const Transak = () => {
  const { address } = useAccount();
  useTransakEvents();

  return (
    <div data-testid="transak-widget" className="w-full h-[600px]">
      <iframe
        // eslint-disable-next-line no-secrets/no-secrets
        src={`https://global.transak.com?apiKey=${TRANSAK_API_KEY}&themeColor=ed4e33&cryptoCurrencyCode=EVMOS&network=evmos&defaultPaymentMethod=credit_debit_card&disableWalletAddressForm=true&walletAddress=${address}`}
        allow="camera;microphone;fullscreen;payment"
        style={{ height: "100%", width: "100%", border: "none" }}
      ></iframe>
    </div>
  );
};

export default Transak;
