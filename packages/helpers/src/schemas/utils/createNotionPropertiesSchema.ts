// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { normalizeObjectKeys } from "./normalizeObjectKeys";

export const createNotionPropertiesSchema = <T extends z.AnyZodObject>(
  schema: T
) =>
  z
    .record(z.unknown())
    .transform((props) => normalizeObjectKeys(props))
    .pipe(schema);
