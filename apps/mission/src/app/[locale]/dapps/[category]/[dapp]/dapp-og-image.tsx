// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { ImageResponse } from "next/og";

export const DAppOgImage = async ({
  params,
  size,
}: {
  params: { locale: string; category: string; dapp: string };
  size: { width: number; height: number };
}) => {
  const { dApps } = await fetchExplorerData();
  const dapp = dApps.find((dApp) => dApp.slug === params.dapp);
  const thumbnail = dapp?.thumbnail?.src;
  if (!thumbnail) {
    throw new Error("Dapp not found");
  }
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div>
        {/* we should not use next/image in the og image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    size,
  );
};
