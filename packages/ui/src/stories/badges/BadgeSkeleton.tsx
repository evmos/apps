import { ComponentProps } from "react";

export const BadgeSkeleton = ({}: ComponentProps<"span">) => {
  return (
    <span className="h-4 px-1.5 py-0.5 bg-surface-container-highest-dark rounded-full  w-8 animate-pulse flex " />
  );
};
