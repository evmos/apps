// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers/src/classnames";
import { ComponentProps, forwardRef } from "react";
import { Surface, SurfaceProps } from "../surface";
type CardProps = {
  background?: string;
  fullWidth?: boolean;
  className?: string;
  enableBottomGradient?: boolean;
} & SurfaceProps;

export const Card = forwardRef<HTMLElementTagNameMap["article"], CardProps>(
  function _Card(
    {
      children,
      className,
      fullWidth = false,
      background,
      rounded,
      enableBottomGradient,
      ...rest
    },
    ref,
  ) {
    // Declaring this here because eslint is buggy and it's picking up "rounded" as if it was inside the string instead of as the name of the variable
    const roundStyles = {
      "rounded-md after:rounded-b-md": rounded === "md",
      "rounded-sm after:rounded-b-sm": rounded === "sm",
      "rounded-lg after:rounded-b-lg": rounded === "lg",
      "rounded-xl after:rounded-b-xl": rounded === "xl",
      "rounded-2xl after:rounded-b-2xl": rounded === "2xl",
      "rounded-3xl after:rounded-b-3xl": rounded === "3xl",
    };
    return (
      <Surface
        as="article"
        className={cn(
          "relative cursor-pointer transition duration-300 ease-in-out w-fit ",
          {
            "w-full": fullWidth,
            "bg-no-repeat bg-cover bg-top-center after:bg-gradient-to-t after:from-black/100 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0":
              background,
            "after:hidden": !enableBottomGradient,
          },
          roundStyles,
          // add the image url to the background
          background && `${background}`,
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </Surface>
    );
  },
);

type CardRankingProps = ComponentProps<"div"> & {
  className?: string;
};

export const CardRanking = forwardRef<HTMLDivElement, CardRankingProps>(
  function _CardRanking({ children, className, ...rest }, ref) {
    return (
      <div
        className={cn("absolute top-0 left-0 overflow-hidden", className)}
        ref={ref}
        {...rest}
      >
        <svg
          viewBox="0 0 32 46"
          width={32}
          height={46}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.5 33.6 0 45.3V0h32v29.9a4 4 0 0 1-2.5 3.7"
            fill="#1D1A19"
          />
          <path
            d="M28.8 32.7 0 44V0h31.3v29a4 4 0 0 1-2.5 3.7"
            fill="#302B29"
          />
        </svg>

        <span
          className={cn("absolute top-2 w-full text-center font-brand", {
            "text-yellow": children === 1,
            "text-slate-400": children === 2,
            "text-orange-400": children === 3,
          })}
        >
          {children}
        </span>
      </div>
    );
  },
);
