import { matchError } from "./matchers";
import { raise } from "./assertions";
import { tryCatch } from "./tryCatch";

export const E = {
  try: tryCatch,
  raise,
  match: matchError,
};
