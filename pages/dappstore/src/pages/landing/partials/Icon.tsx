// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers/src/classnames";
import Image from "next/image";
import { DApp } from "../../../lib/fetch-explorer-data";

export const Icon = ({ data }: { data: DApp }) => {
  const img = data.icon;
  return (
    <div
      className={cn(
        "relative shrink-0 w-12 h-12 aspect-square rounded-lg shadow overflow-hidden",
      )}
    >
      {img && (
        <Image
          src={img.src}
          blurDataURL={img.blurDataURL}
          placeholder="blur"
          alt="Test"
          fill={true}
          className="object-cover"
          sizes={"400w"}
        />
      )}
    </div>
  );
};
