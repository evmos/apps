// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { twMerge } from "tailwind-merge";
import cx from "clsx";

export const cn = (...args: Parameters<typeof cx>) => twMerge(cx(...args));
