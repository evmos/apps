// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ComponentProps, Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export function SuspenseBoundary({
  errorFallback,
  ...rest
}: {
  errorFallback:
  | ComponentProps<typeof ErrorBoundary>["errorComponent"]
  | React.ReactNode;
} & ComponentProps<typeof Suspense>) {
  return (
    <ErrorBoundary
      errorComponent={
        typeof errorFallback === "function"
          ? errorFallback
          : () => errorFallback
      }
    >
      <Suspense {...rest} />
    </ErrorBoundary>
  );
}
