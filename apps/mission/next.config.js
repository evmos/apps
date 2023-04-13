/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.evmos.org',
    ],
  },
  reactStrictMode: true,
  basePath: "/mission",
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
