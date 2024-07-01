// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import react from "@vitejs/plugin-react";

import { defineConfig } from "vitest/config";
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;
const config = defineConfig({
  plugins: [react()],

  test: {
    alias: {
      "server-only": "next",
      react: path.join(
        __dirname,
        "../node_modules",
        'next/dist/compiled/react',
      ),
    },
    environment: "happy-dom",

    exclude: [
      "**/.netlify/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
  },
});

export default config;
