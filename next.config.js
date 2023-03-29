/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.evmos.org", "v5.airtableusercontent.com"],
  },
  reactStrictMode: true,
  basePath: "/assets",
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
