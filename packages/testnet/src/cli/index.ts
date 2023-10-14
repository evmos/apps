import { setupTestnet } from "../initializers";

await setupTestnet({
  enableLogging: true,
  overwrite: process.argv.includes("--overwrite"),
});
