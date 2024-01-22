export const getPubUrl = () => {
  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "development") {
      return (
        process.env.VERCEL_URL ||
        process.env.NEXT_PUBLIC_VERCEL_URL ||
        `http://localhost:${process.env.PORT}`
      );
    }
    return (
      process.env.VERCEL_URL ||
      process.env.NEXT_PUBLIC_VERCEL_URL ||
      "https://staging-app.evmos.org"
    );
  }
  return window.location.origin;
};
