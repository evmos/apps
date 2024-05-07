// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers";
import { ComponentProps } from "react";

import Image from "next/image";
import { Surface } from "@evmosapps/ui/components/surface/index.tsx";

export const BannerCard = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <Surface
      className={cn(
        "flex relative lg:h-96 flex-col justify-end lg:justify-center overflow-hidden",
        className,
      )}
      {...props}
    />
  );
};

BannerCard.BgImage = function BannerBgImage({
  className,
  ...props
}: ComponentProps<typeof Image>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-52 lg:h-auto",
        "lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full",

        "after:absolute after:top-0 after:left-0 after:w-full after:h-full",
        "after:bg-gradient-to-t after:from-surface after:dark:from-surface-dark after:to-transparent",
        "lg:after:from-0% lg:after:to-50% lg:after:to-transparent lg:after:bg-gradient-to-r after:from-5%",
        className,
      )}
    >
      {/* alt prop will be provided by this component consumer, so we can ignore it here */}
      {/* eslint-disable-next-line jsx-a11y/alt-text  */}
      <Image
        className="object-center"
        objectFit="cover"
        sizes="100vw"
        fill
        {...props}
      />
    </div>
  );
};
BannerCard.Body = function BannerBody({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative px-8 md:px-12 py-5 flex flex-col items-start",
        className,
      )}
      {...props}
    />
  );
};
