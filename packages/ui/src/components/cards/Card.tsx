// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers/src/classnames";
import { ComponentProps, forwardRef } from "react";

type CardProps = ComponentProps<"article"> & {
  background?: string;
  fullWidth?: boolean;
  className?: string;
};

export const Card = forwardRef<HTMLElementTagNameMap["article"], CardProps>(
  function _Card(
    { children, className, fullWidth = false, background, ...rest },
    ref,
  ) {
    return (
      <article
        className={cn(
          "rounded-xl cursor-pointer transition duration-300 ease-in-out w-fit bg-surface-container-lowest dark:bg-surface-container-lowest-dark hover:bg-surface-container hover:dark:bg-surface-container-dark",
          {
            "w-full": fullWidth,
            "bg-no-repeat bg-cover bg-top-center after:bg-gradient-to-t after:from-black/70 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0":
              background,
          },
          // add the image url to the background
          background && `${background}`,
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </article>
    );
  },
);

type RankingProps = ComponentProps<"div"> & {
  className?: string;
};

export const Ranking = forwardRef<HTMLDivElement, RankingProps>(
  function _Ranking({ children, className, ...rest }, ref) {
    return (
      <div
        className={cn(
          "w-8 h-12 bg-no-repeat bg-contain relative bg-ranking z-10 rounded-tl-xl flex items-center justify-center pb-2",
          className,
        )}
        ref={ref}
        {...rest}
      >
        <div className="absolute text-center -translate-x-1/2 top-[4px] left-1/2 text-white text-base font-brand leading-7"></div>

        {children}
      </div>
    );
  },
);
