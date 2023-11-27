import { ChalkInstance } from "chalk";
import { Log } from "helpers";
import pino from "pino";
import pretty from "pino-pretty";
export const logger = pino(pretty());

export const createLogger = (options: {
  enabled: boolean;
  label: string;
  color: ChalkInstance;
}) => {
  const { enabled, label, color } = options;

  return {
    raw: (message: string) => {
      if (enabled) {
        Log().info(message);
      }
    },
    info: (message: string) => {
      if (enabled) {
        logger.info([color(`[${label}]`), `${message}`].join(" "));
      }
    },
  };
};
