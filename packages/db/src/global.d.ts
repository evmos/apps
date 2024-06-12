import type { PrismaClient } from "./dappstore/prisma/generated/client";
// declare var dAppStorePrisma: number

declare global {
  // Needs to be `var` isnted of `let`
  // otherwise type will not be assigned to `globalThis`
  // see https://stackoverflow.com/questions/38906359/create-a-global-variable-in-typescript
  // eslint-disable-next-line no-var
  var dAppStorePrisma: PrismaClient;
}
