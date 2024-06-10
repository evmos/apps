#!/usr/bin/env pnpm tsx
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// Load environment variables
// import "../utils/load-env";
import { program } from "@commander-js/extra-typings";

// load commands
import "./release";

await program.parseAsync(process.argv);
