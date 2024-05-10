// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ImageProps } from "next/image";
import { getImageProps } from "next/image";

export function getBackgroundImage(img: Omit<ImageProps, "alt">) {
  const { props } = getImageProps({ ...img, alt: "" });
  const imageSet = (props.srcSet || "")
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}
