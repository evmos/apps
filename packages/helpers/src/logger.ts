const { log, error, trace, table, warn } = console;

type LogCategory = "notion" | "tracking" | "dev-cache-mode" | "general";
/**
 * This works just as console.log, but it's to be used when we intentionally want to keep logs in production.
 * using console.log directly will trigger eslint errors.
 */

export const Log = (category: LogCategory = "general") => {
  const isEnabled =
    process.env.NEXT_PUBLIC_ENABLED_LOGS === "true" ||
    process.env.NEXT_PUBLIC_ENABLED_LOGS?.split(",").includes(category);
  return {
    info: (message: unknown, ...messages: unknown[]) => {
      if (!isEnabled) return;
      log(`[${category}]`, message, ...messages);
    },
    error: (message: unknown, ...messages: unknown[]) => {
      if (!isEnabled) return;
      error(`[${category}]`, message, ...messages);
    },
    trace: (message: unknown, ...messages: unknown[]) => {
      if (!isEnabled) return;
      trace(`[${category}]`, message, ...messages);
    },
    warn: (message: unknown, ...messages: unknown[]) => {
      if (!isEnabled) return;
      warn(`[${category}]`, message, ...messages);
    },
    table(...data: unknown[]) {
      if (!isEnabled) return;
      log(`[${category}]`);
      table(...data);
    },
  };
};
