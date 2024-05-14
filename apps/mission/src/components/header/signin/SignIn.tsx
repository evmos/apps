// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ErrorBoundary } from "react-error-boundary";
import { LazySignInDisplay } from "./LazySignInDisplay";

export const SignIn = () => {
  return (
    <ErrorBoundary fallback={null}>
      <LazySignInDisplay />
    </ErrorBoundary>
  );
};
