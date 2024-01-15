"use server";
import sharp from "sharp";

import NextImage from "next/image";
import { ComponentProps } from "react";
import { unstable_cache } from "next/cache";
import { cachedFetch } from "helpers/src/dev/cached-fetch";

const bufferToBase64 = (buffer: Buffer) =>
  `data:image/png;base64,${buffer.toString("base64")}`;

const getImgProps = unstable_cache(
  async (src: string) => {
    if (process.env.NODE_ENV === "development") {
      return {
        src,
        blurDataURL: undefined,
        placeholder: undefined,
      };
    }
    const buffer = await cachedFetch(src, {
      devCache: {
        revalidate: 60 * 60 * 24 * 7,
      },
    }).then((res) => res.arrayBuffer());
    const data = await sharp(Buffer.from(buffer)).resize(8, 8).png().toBuffer();

    return {
      src,
      blurDataURL: bufferToBase64(data),
      placeholder: "blur",
    } as const;
  },
  ["image"],
  {
    revalidate: 60 * 60 * 24 * 7,
  }
);

export const Image = async ({
  src,
  ...props
}: Omit<ComponentProps<typeof NextImage>, "src"> & {
  src: string;
}) => {
  const imgProps = await getImgProps(src);
  return <NextImage {...imgProps} {...props} />;
};
