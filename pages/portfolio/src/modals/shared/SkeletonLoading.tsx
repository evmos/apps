import { ComponentProps } from "react";
import { cn } from "helpers";

export const SkeletonLoading = ({
  className,
  loading,
  children,
  ...rest
}: ComponentProps<"span"> & { loading?: boolean }) => (
  <span
    className={cn(
      {
        "animate-pulse w-20 h-full inline-flex align-bottom bg-white/10 rounded min-h-[1em]":
          loading && !children,
      },
      className,
    )}
    {...rest}
  >
    {children}
  </span>
);
