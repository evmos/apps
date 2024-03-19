// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers/src/classnames";
import Image from "next/image";

export const Icon = () => {
  return (
    <div
      className={cn(
        "relative shrink-0 w-12 h-12 aspect-square rounded-lg shadow overflow-hidden",
      )}
    >
      <Image
        src="https://via.placeholder.com/56x56"
        // blurDataURL={dapp.icon.blurDataURL}
        // placeholder="blur"
        alt="Test"
        fill={true}
        className="object-cover"
        sizes={"400w"}
      />
    </div>
  );
};
