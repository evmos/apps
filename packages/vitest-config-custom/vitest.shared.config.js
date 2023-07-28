import react from "@vitejs/plugin-react";

export default {
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
};
