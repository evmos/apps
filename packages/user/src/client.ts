// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PrismaClient } from "./prisma/generated/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.dAppStorePrisma) {
    global.dAppStorePrisma = new PrismaClient();
  }
  prisma = global.dAppStorePrisma;
}

export const dAppStorePrisma = prisma;

