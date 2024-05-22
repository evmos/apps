// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { unstable_cache } from "next/cache";
import { ImageResponse } from "next/og";

const getThumbnailUrl = unstable_cache(async (slug: string) => {
  const { dApps } = await fetchExplorerData();
  const dapp = dApps.find((dApp) => dApp.slug === slug);
  return dapp?.thumbnail?.src;
})

export const DAppOgImage = async ({
  params,
  size,
}: {
  params: { locale: string; category: string; dapp: string };
  size: { width: number; height: number };
}) => {
  const thumbnail = await getThumbnailUrl(params.dapp);
  if (!thumbnail) {
    throw new Error("Dapp not found");
  }
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
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
    size
  );
};
