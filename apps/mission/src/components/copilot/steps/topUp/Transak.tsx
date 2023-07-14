// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const TRANSAK_API_KEY = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ?? "";

export default function Transak() {
  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "545px",
        margin: "auto",
        marginTop: "25px",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <iframe
        // eslint-disable-next-line no-secrets/no-secrets
        src={`https://global-stg.transak.com?apiKey=${TRANSAK_API_KEY}&themeColor=ed4e33&cryptoCurrencyCode=EVMOS&network=evmos&defaultPaymentMethod=credit_debit_card`}
        allow="camera;microphone;fullscreen;payment"
        style={{ height: "100%", width: "100%", border: "none" }}
      ></iframe>
    </div>
  );
}
