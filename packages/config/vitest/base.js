import react from "@vitejs/plugin-react";

import { defineConfig } from "vitest/config";

const config = defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",

    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
  },
});

export default config;
