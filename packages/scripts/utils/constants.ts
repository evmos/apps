import path from "path";
import { fileURLToPath } from "url";

export const REPO_ROOT = path.join(
  fileURLToPath(import.meta.url),
  "../../../../",
);
