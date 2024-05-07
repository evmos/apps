// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image, { ImageProps } from "next/image";
import { Surface } from "@evmosapps/ui/components/surface/index.tsx";
import { cn } from "helpers/src/classnames";
import { PartialBy } from "viem/chains";

export const MaybeImage = ({
  src,
  alt,
  className,
  placeholder,
  blurDataURL,
  width,
  height,
  ...props
}: PartialBy<ImageProps, "src">) => {
  const aspectRatio =
    width && height ? Number(width) / Number(height) : undefined;
  if (!src) {
    return (
      <Surface
        high
        style={{
          aspectRatio: aspectRatio,
          width,
          height,
        }}
        className={cn("rounded-lg flex-none", className)}
        {...props}
      />
    );
  }

  return (
    <Image
      className={cn("rounded-lg", className)}
      src={src}
      alt={alt}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      width={width}
      height={height}
      style={{
        aspectRatio: aspectRatio,
      }}
      {...props}
    />
  );
};
