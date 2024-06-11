// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const VERCEL_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : undefined;

export const getPubUrl = () => {
  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "development") {
      return (
        VERCEL_URL ||
        NEXT_PUBLIC_VERCEL_URL ||
        `http://localhost:${process.env.PORT}`
      );
    }
    return (
      VERCEL_URL || NEXT_PUBLIC_VERCEL_URL || "https://staging-store.evmos.org"
    );
  }
  return window.location.origin;
};
