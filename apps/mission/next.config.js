// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
const { version } = require('./package.json');
const { i18n } = require("./next-i18next.config");

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
  i18n,
  publicRuntimeConfig: {
    version,
  },
};

module.exports = nextConfig;
