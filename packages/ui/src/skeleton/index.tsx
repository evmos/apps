// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers/src/classnames";
import { ComponentProps } from "react";

export const Skeleton = ({ className, ...rest }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "skeleton [&_.skeleton]:animate-none animate-pulse",
        className,
      )}
      {...rest}
    />
  );
};
export const SkeletonBlob = ({
  className,
  aspect,
  ...rest
}: {
  aspect?: boolean | string;
} & ComponentProps<"span">) => {
  return (
    <span
      className={cn(
        "skeleton block h-[1lh] rounded-md animate-pulse relative",
        "after:bg-surface-container-highest dark:after:bg-surface-container-high-dark",
        "after:w-full after:h-full after:absolute after:rounded-full",
        {
          "aspect-square": aspect === true,
          aspect: typeof aspect === "string",
        },
        className,
      )}
      {...rest}
    />
  );
};

export const SkeletonLine = ({
  className,
  ...rest
}: ComponentProps<"span">) => {
  return <SkeletonBlob className={cn("after:h-3/4", className)} {...rest} />;
};
const WIDTH_RANDOMIZER = [
  "after:w-3/4",
  "after:w-4/6",
  "after:w-5/6",
  "after:w-2/3",
  "after:w-1/2",
  "after:w-1/3",
];
const makeArray = (size: number) => Array.from({ length: size }, (_, i) => i);
export const SkeletonBlock = ({
  lines = 5,
  ...rest
}: { lines?: number } & ComponentProps<"div">) => {
  return (
    <Skeleton {...rest}>
      {makeArray(lines).map((_, i) => (
        <SkeletonLine
          key={i}
          className={WIDTH_RANDOMIZER[i % WIDTH_RANDOMIZER.length]}
        />
      ))}
    </Skeleton>
  );
};

Skeleton.Line = SkeletonLine;
Skeleton.Block = SkeletonBlock;
Skeleton.Blob = SkeletonBlob;
