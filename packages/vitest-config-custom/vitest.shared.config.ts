import react from "@vitejs/plugin-react";
import path from "path";

export const sharedConfig = {
  plugins: [react()],
  test: {
    environment: "jsdom",
    deps: {
      moduleDirectories: [path.resolve("../../packages"), "node_modules"],
    },
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
  },
};
