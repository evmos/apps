import { twMerge } from "tailwind-merge";
import cx from "clsx";

export const cn = (...args: Parameters<typeof cx>) => twMerge(cx(...args));
