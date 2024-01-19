// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { cn } from "helpers";

const variableWidth = ["w-8/12", "w-10/12", "w-6/12", "w-7/12", "w-2/12"];
export const Skeleton = ({ lines = 1, dark = false }) => {
  return (
    <div
      className="relative flex flex-col gap-[0.2lh] animate-pulse"
      aria-hidden={true}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-[0.8lh] rounded-xs",
            variableWidth[i % variableWidth.length],
            {
              "bg-black/10": !dark,
              "bg-white/5": dark,
            },
          )}
        />
      ))}
    </div>
  );
};
