const { log, error, trace, table, warn } = console;

type LogCategory = "notion" | "tracking";
/**
 * This works just as console.log, but it's to be used when we intentionally want to keep logs in production.
 * using console.log directly will trigger eslint errors.
 */

export const Log = (category: LogCategory | LogCategory[] = []) => {
  const categories = Array.isArray(category) ? category : [category];

  const isEnabled =
    process.env.ENABLED_LOGS === "true" ||
    categories.length === 0 ||
    process.env.ENABLED_LOGS?.split(",").some((c) =>
      categories.includes(c as LogCategory)
    );
  return {
    info: (message: unknown, ...messages: unknown[]) => {
      if (!isEnabled) return;
      log(message, ...messages);
    },
    error: (message: unknown, ...messages: unknown[]) => {
      if (!isEnabled) return;
      error(message, ...messages);
    },
    trace: (message: unknown, ...messages: unknown[]) => {
      if (!isEnabled) return;
      trace(message, ...messages);
    },
    warn: (message: unknown, ...messages: unknown[]) => {
      if (!isEnabled) return;
      warn(message, ...messages);
    },
    table(...data: unknown[]) {
      if (!isEnabled) return;
      table(...data);
    },
  };
};
