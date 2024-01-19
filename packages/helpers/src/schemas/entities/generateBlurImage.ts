// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import sharp from "sharp";
import { unstable_cache } from "next/cache";
const bufferToBase64 = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`;
export const generateBlurImage = unstable_cache(
  async (src: string) => {
    // if (process.env.NODE_ENV === "development") {
    // }
    const buffer = await fetch(src, {
      next: {
        revalidate: 60 * 60 * 24 * 7,
      },
    }).then((res) => res.arrayBuffer());
    const data = await sharp(Buffer.from(buffer)).resize(8, 8).png().toBuffer();

    return bufferToBase64(data);
  },
  ["image"],
  {
    revalidate: 60 * 60 * 24 * 7,
  },
);
