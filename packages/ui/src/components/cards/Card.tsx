// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers/src/classnames";
import { ComponentProps } from "react";

export const Card = ({
  children,
  onClick,
  fullWidth = false,
  background,
  ...rest
}: ComponentProps<"article"> & {
  background?: string;
  fullWidth?: boolean;
}) => {
  return (
    <article
      className={`rounded-xl cursor-pointer transition duration-300 ease-in-out
      ${fullWidth ? "w-full" : "w-fit"}
     ${
       background
         ? `bg-no-repeat bg-cover ${background} after:bg-gradient-to-t after:from-black/70 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0`
         : "bg-surface-container-lowest dark:bg-surface-container-lowest-dark hover:bg-surface-container hover:dark:bg-surface-container-dark"
     } `}
      onClick={onClick}
      {...rest}
    >
      {children}
    </article>
  );
};

const Ranking = ({ children, className }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "w-8 h-12 bg-no-repeat bg-contain relative bg-ranking z-10 rounded-tl-xl flex items-center justify-center pb-2",
        className,
      )}
    >
      <div className="absolute text-center -translate-x-1/2 top-[4px] left-1/2 text-white text-base font-brand leading-7"></div>

      {children}
    </div>
  );
};

Card.Ranking = Ranking;
