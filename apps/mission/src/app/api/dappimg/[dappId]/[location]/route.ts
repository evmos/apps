// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchDapps } from "@evmosapps/dappstore-page/src/lib/fetch-dapps";
import { Log } from "helpers/src/logger";
export async function generateStaticParams() {
  const notionDapps = Object.values(await fetchDapps());

  const options = notionDapps.flatMap((dapp) => {
    const imgs = [];
    if (dapp.icon) {
      imgs.push({
        dappId: dapp.slug,
        location: "icon",
      });
    }
    if (dapp.thumbnail) {
      imgs.push({
        dappId: dapp.slug,
        location: "thumbnail",
      });
    }
    if (dapp.cover) {
      imgs.push({
        dappId: dapp.slug,
        location: "cover",
      });
    }
    return imgs;
  });
  return options;
}
export async function GET(
  _: Request,
  {
    params: { dappId, location },
  }: {
    params: {
      dappId: string;
      location: "thumbnail" | "cover" | "icon";
    };
  },
) {
  Log().info("Generating image for:", dappId, location);
  const notionDapps = await fetchDapps();
  const dapp = Object.values(notionDapps).find((dapp) => dapp.slug === dappId);
  if (!dapp) {
    return new Response("Dapp not found", {
      status: 404,
    });
  }

  const imgProps = dapp[location];

  if (!imgProps) {
    return new Response("Image not found", {
      status: 404,
    });
  }

  if (imgProps.expiryTime && new Date(imgProps.expiryTime) < new Date()) {
    return new Response("Image expired", {
      status: 404,
    });
  }
  const data = await fetch(imgProps._originalSrc);
  const contentType = data.headers.get("Content-Type");

  return new Response(data.body, {
    headers: contentType ? { "Content-Type": contentType } : {},
  });
}
