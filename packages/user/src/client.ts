// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PrismaClient } from "./prisma/generated/client";

const getClient = () =>
  new PrismaClient().$extends({
    result: {
      walletAccount: {
        address: {
          // the dependencies
          needs: { address: true },
          compute(user) {
            return user.address as `0x${string}` | `${string}1${string}`;
          },
        },
      },
    },
  });
let prisma: ReturnType<typeof getClient> 

if (process.env.NODE_ENV === "production") {
  prisma = getClient();
} else {
  if (!global.dAppStorePrisma) {
    global.dAppStorePrisma = getClient();
  }
  prisma = global.dAppStorePrisma as ReturnType<typeof getClient>;
}

export const dAppStorePrisma = prisma;
