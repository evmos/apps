// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ComponentProps } from "react";
import { VariantProps, cva } from "class-variance-authority";

// common styles
const styles = cva(
  "bg-stone-900 hover:bg-stone-800 rounded-xl cursor-pointer transition duration-300 ease-in-out",
  {
    variants: {
      intent: {
        recent: "pl-4 pr-5 pt-5 pb-4",
        developers: "pl-4 pr-5 pt-3 pb-3",
        trending: "",
        // px-4 py-4
        story: "",
        // px-8 pb-10
        //   32 y 24 para el no full width
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    // for each of the variants that you define, you can define the default value
    defaultVariants: {
      intent: "recent",
      fullWidth: false,
    },
    compoundVariants: [
      {
        intent: "story",
        fullWidth: true,
        // className: "px-8 pb-6",
      },
    ],
  },
);

export const Card = ({
  children,
  intent,
  fullWidth,
  onClick,
  ...rest
}: ComponentProps<"article"> & VariantProps<typeof styles>) => {
  return (
    <article
      className={styles({
        intent,
        fullWidth,
      })}
      onClick={onClick}
      {...rest}
    >
      {children}
    </article>
  );
};
