// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.evmos.org',
    ],
  },
  reactStrictMode: true,
  basePath: "",
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
